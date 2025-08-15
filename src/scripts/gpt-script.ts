import z from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const schema = z.object({
    status: z.enum(["UP", "DOWN", "ERROR"]),
    httpCode: z.number().nullable(),
    responseTime: z.number().nullable(),
    errorMessage: z.string().nullable(),
});

const genAI = new GoogleGenerativeAI("AIzaSyDXBtEdmsAKs9MVTHNmbLOX68cr6nW8yps");

async function generateWithRetry(prompt: string, retries = 3) {
    const modelNames = ["gemini-1.5-flash", "gemini-1.0-pro"];

    for (let i = 0; i < retries; i++) {
        const modelName = i === retries - 1 ? modelNames[1] : modelNames[0];
        const model = genAI.getGenerativeModel({ model: modelName });

        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (err: any) {
            if (err.status === 503 && i < retries - 1) {
                const wait = 2000 * (i + 1);
                console.warn(`⚠️ ${modelName} busy, retrying in ${wait / 1000}s...`);
                await new Promise(res => setTimeout(res, wait));
                continue;
            }
            throw err;
        }
    }
}

export async function generateGeminiResponse({
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
    const prompt = `You are a website uptime checker.
HTTP Code: ${httpCode}
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
        console.error("Gemini analysis failed:", err);
        return null;
    }
}
