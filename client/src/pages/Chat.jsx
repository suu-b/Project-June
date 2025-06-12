import { useState } from "react"
import { Send, Flower } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ResearchChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")

  const returnRelevantChunks = async (query) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/query`, { query });
    const results = response.data.result;

    if (results?.length) {
      results.forEach((res, idx) => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${idx}`,
            content: res.pageContent || "No content",
            sender: "assistant",
            timestamp: new Date(),
          },
        ]);
      });
    }

    toast.success("Found relevant chunks!");
  } catch (error) {
    console.error(error);
    toast.error("Error returning the relevant chunks. Please try again.");
  }
};
 
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    returnRelevantChunks(inputValue);
    setInputValue("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
        
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "assistant" && (
                <Avatar className="h-8 w-8 border-2" style={{ borderColor: "#8E80FC20" }}>
                  <AvatarFallback style={{ backgroundColor: "#8E80FC", color: "white" }} className="text-xs">
                    <Flower className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "ml-12 text-white"
                    : "bg-muted text-foreground"
                }`}
                style={
                  message.sender === "user"
                    ? { backgroundColor: "#8E80FC", minWidth: "300px" }
                    : undefined
                }
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p
                  className="text-xs mt-2"
                  style={{
                    color: message.sender === "user" ? "rgba(255,255,255,0.7)" : "#64748b",
                  }}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 border-2 border-muted flex justify-center items-center shadow">
                 <Flower color="#64748b" className="h-4 w-4"/>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border/40 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask something..."
                className="min-h-[60px] pr-12 resize-none rounded-xl border-border/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ borderColor: "#8E80FC" }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-lg text-white"
                style={{ backgroundColor: "#8E80FC" }}
              >
                <Send className="h-10 w-10" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
