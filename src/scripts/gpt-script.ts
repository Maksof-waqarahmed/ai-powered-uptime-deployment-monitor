import z from "zod";
import OpenAI from "openai";

const schema = z.object({
  status: z.enum(["UP", "DOWN", "ERROR"]),
  httpCode: z.number().nullable(),
  responseTime: z.number().nullable(),
  errorMessage: z.string().nullable(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateWithRetry(prompt: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a website uptime checker. Return only valid JSON.",
          },
          { role: "user", content: prompt },
        ],
      });

      return completion.choices[0]?.message?.content || "";
    } catch (err) {
      if (i < retries - 1) {
        const wait = 2000 * (i + 1);
        console.warn(`⚠️ GPT busy or failed, retrying in ${wait / 1000}s...`);
        await new Promise((res) => setTimeout(res, wait));
        continue;
      }
      throw err;
    }
  }
}

export async function generateGPTResponse({
  httpCode,
  responseTime,
  errorMessage,
  bodySnippet,
}: {
  httpCode: number | null;
  responseTime: number | null;
  errorMessage: string | null;
  bodySnippet: string;
}) {
  const prompt = `HTTP Code: ${httpCode}
Response Time: ${responseTime} ms
Error Message: ${errorMessage}
Body Snippet: """${bodySnippet}"""

From this information, decide:
1. "status" — "UP", "DOWN", or "ERROR"
2. "httpCode" — the numeric HTTP status code or null
3. "responseTime" — time in milliseconds or null
4. "errorMessage" — short human-readable error, or null

Rules:
- UP: status code 200–299, and content seems normal
- DOWN: status code 400–599, or clearly an outage page
- ERROR: request failed due to network/DNS/timeout
- Always return valid JSON only, no extra commentary.`;

  try {
    const text = await generateWithRetry(prompt);
    const clean = text?.replace(/```json|```/g, "").trim();

    const parsed = schema.safeParse(JSON.parse(clean || ""));
    if (!parsed.success) {
      console.error("❌ Schema validation failed:", parsed.error);
      return null;
    }
    return parsed.data;
  } catch (err) {
    console.error("GPT analysis failed:", err);
    return null;
  }
}
