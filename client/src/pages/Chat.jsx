import { useState } from "react";
import { Send, Flower, Search } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWebSearchAllowed, setIsWebSearchAllowed] = useState(false)

  const location = useLocation();
  const formattedTitle = location.state.formattedTitle

  const returnRelevantChunks = async (query) => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/query`,
        {query, isWebSearchAllowed}
      );
      const result = response.data.result;
      if (result) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant`,
            content: result,
            sender: "assistant",
            timestamp: new Date(),
          },
        ]);
        toast.success("Answer received!");
      } else {
        toast.warning("No relevant answer was found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error retrieving answer from assistant.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    returnRelevantChunks(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen min-w-full bg-background p-8 mx-auto">
      <h1 className="font-bold text-[#8E80FC] text-xl mt-10">
        <span className="text-slate-600">On </span>{formattedTitle}
      </h1>
      <hr className="my-10" />
      <ScrollArea className="flex-1">
        <div className="space-y-6 max-w-4xl mx-auto w-full h-full my-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[70vh] text-center">
              <div className="text-7xl mb-4">🌸</div>
              <Card className="max-w-lg w-full border-none shadow-none bg-white/60 backdrop-blur-md">
                <CardContent className="px-6">
                  <h2 className="text-4xl font-bold text-[#8E80FC] mb-2">
                    Ready when you are!
                  </h2>
                  <p className="text-lg font-semibold text-slate-500">
                    Ask a question below and let curiosity blossom.
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Summarize the document...",
                  "What are the key takeaways from this topic?",
                  "Can you list all the citations?",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(suggestion)}
                    className="cursor-pointer text-sm px-4 py-2 rounded-lg w-48 h-42 shadow-lg border border-[#8E80FC40] bg-[#8E80FC10] text-[#8E80FC] hover:bg-[#8E80FC20] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <Avatar
                      className="h-8 w-8 border-2"
                      style={{ borderColor: "#8E80FC20" }}
                    >
                      <AvatarFallback
                        style={{ backgroundColor: "#8E80FC", color: "white" }}
                        className="text-xs"
                      >
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{
                        color:
                          message.sender === "user"
                            ? "rgba(255,255,255,0.7)"
                            : "#64748b",
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
                      <Flower color="#64748b" className="h-4 w-4" />
                    </Avatar>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start items-center">
                  <Avatar className="h-8 w-8 border-2" style={{ borderColor: "#8E80FC20" }}>
                    <AvatarFallback
                      style={{ backgroundColor: "#8E80FC", color: "white" }}
                      className="text-xs"
                    >
                      <Flower className="h-4 w-4 animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                    <p className="text-sm leading-relaxed text-slate-500 whitespace-pre-wrap">June is thinking...</p>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border/40 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 flex-col justify-end">
            <Button
                onClick={() => {
                  setIsWebSearchAllowed(webSearchAllowed => !webSearchAllowed)
                }}
                disabled={!inputValue.trim()}
                size="sm"
                className="h-fit w-fit text-xs p-x-3 py-2 rounded-lg text-white"
                style={{ backgroundColor: "#8E80FC" }}
              >
               {isWebSearchAllowed ? "Allowed": "Allow"} Web Search <Search className="w-4 h-4>" />
              </Button>
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
  );
}
