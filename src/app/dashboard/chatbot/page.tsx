"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    content:
      "Hello! I'm your AI assistant for uptime monitoring. I can help you analyze your uptime data, explain incidents, and provide insights about your services. What would you like to know?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("uptime") || lowerInput.includes("status")) {
      return "Based on your current monitoring data, your overall uptime is 99.2% across all services. Your main website has been performing excellently with 99.9% uptime, while your database experienced a brief outage earlier today, bringing its uptime to 98.2%. Would you like me to analyze the specific incident that caused the database downtime?"
    }

    if (lowerInput.includes("incident") || lowerInput.includes("down") || lowerInput.includes("error")) {
      return "I've identified 3 incidents in the past week. The most recent was a database timeout that occurred 6 hours ago, lasting approximately 15 minutes. This was likely caused by a connection pool exhaustion during peak traffic. The incident was automatically resolved when the connection pool was reset. Would you like me to provide recommendations to prevent similar issues?"
    }

    if (lowerInput.includes("performance") || lowerInput.includes("response")) {
      return "Your average response times are looking good! Main Website: 245ms, API Server: 156ms, CDN: 89ms. However, I notice the database response time spiked to timeout during the recent incident. I recommend implementing connection pooling optimization and adding more monitoring for database performance metrics."
    }

    if (lowerInput.includes("recommendation") || lowerInput.includes("improve")) {
      return "Here are my recommendations to improve your monitoring setup: 1) Add health check endpoints for better service monitoring, 2) Implement cascading alerts to reduce notification noise, 3) Set up automated failover for critical services, 4) Consider adding synthetic transaction monitoring for user journey testing. Would you like me to elaborate on any of these suggestions?"
    }

    return "I understand you're asking about your monitoring setup. I can help you with uptime analysis, incident investigation, performance optimization, and monitoring best practices. Could you be more specific about what aspect you'd like to explore?"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
        <p className="text-muted-foreground">Get intelligent insights about your uptime data and monitoring setup</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Ask me about your uptime data, incidents, or monitoring setup..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
