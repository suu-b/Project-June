import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flower } from "lucide-react";
import { marked } from "marked";
import ReactHtmlParser from "html-react-parser";

export default function Message({ message, speed = 25, delay = 0, className = "" }) {
  const isUser = message.sender === "user";
  const rawText = message.content || "";

  const [displayedText, setDisplayedText] = useState(isUser ? rawText : "");
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!isUser) {
      const splitTokens = rawText.match(/(\w+|\s+|[^\w\s]+)/g) || [];
      setTokens(splitTokens);
      setDisplayedText("");
      setCurrentTokenIndex(0);
    } else {
      setDisplayedText(rawText);
    }
  }, [rawText, isUser]);

  useEffect(() => {
    if (isUser || currentTokenIndex >= tokens.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + tokens[currentTokenIndex]);
      setCurrentTokenIndex((prev) => prev + 1);
    }, currentTokenIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentTokenIndex, tokens, speed, delay, isUser]);

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} ${className}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 border-2" style={{ borderColor: "#8E80FC20" }}>
          <AvatarFallback className="text-xs" style={{ backgroundColor: "#8E80FC", color: "white" }}>
            <Flower className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed text-justify ${
          isUser ? "ml-12 text-white" : "bg-muted text-foreground"
        }`}
        style={
          isUser ? { backgroundColor: "#8E80FC", minWidth: "300px" } : undefined
        }
      >
        {ReactHtmlParser(marked.parse(displayedText))}
        <p className="text-xs mt-2" style={{ color: isUser ? "rgba(255,255,255,0.7)" : "#64748b" }}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 border-2 border-muted flex justify-center items-center shadow">
          <Flower color="#64748b" className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
}
