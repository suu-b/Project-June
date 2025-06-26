
import { useEffect, useState, useRef, useCallback } from "react"
import { Send, Flower, Search } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
import Message from "../components/sections/Message"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isWebSearchAllowed, setIsWebSearchAllowed] = useState(false)

  const scrollAreaRef = useRef(null)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const location = useLocation()
  const formattedTitle = location?.state?.formattedTitle
  const from = location?.state?.from

  useEffect(() => {
    if (!formattedTitle || !from || from != "transition") {
      navigate("/home")
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [])

  useEffect(() => {
    const messagesContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")

    if (!messagesContainer) return

    const resizeObserver = new ResizeObserver((entries) => {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

      if (isNearBottom) {
        requestAnimationFrame(() => {
          scrollToBottom()
        })
      }
    })

    const messagesDiv = messagesContainer.querySelector(".space-y-6") || messagesContainer
    if (messagesDiv) {
      resizeObserver.observe(messagesDiv)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [messages, scrollToBottom])

  useEffect(() => {
    const messagesContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
    if (!messagesContainer) return

    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScroll = false

      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "characterData") {
          const { scrollTop, scrollHeight, clientHeight } = messagesContainer
          const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

          if (isNearBottom) {
            shouldScroll = true
          }
        }
      })

      if (shouldScroll) {
        requestAnimationFrame(() => {
          scrollToBottom()
        })
      }
    })

    const messageElements = messagesContainer.querySelectorAll("[data-message]")
    messageElements.forEach((element) => {
      mutationObserver.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    })

    return () => {
      mutationObserver.disconnect()
    }
  }, [messages, scrollToBottom])

  const returnRelevantChunks = async (query) => {
    try {
      setLoading(true)
      const messagesToSend = messages.slice(-5);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/query`, { query, isWebSearchAllowed, messages : messagesToSend })
      const result = response.data.result
      if (result) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant`,
            content: result,
            sender: "assistant",
            timestamp: new Date(),
          },
        ])
        toast.success("Answer received!")
      } else {
        toast.warning("No relevant answer was found.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error retrieving answer from assistant.")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    returnRelevantChunks(inputValue)
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
      <div className="flex-shrink-0 px-8 pt-8 pb-4">
        <h1 className="font-bold text-[#8E80FC] text-xl mt-5">
          <span className="text-slate-600">On </span>
          {formattedTitle}
        </h1>
        <hr className="my-6" />
      </div>

      <div className="flex-1 overflow-hidden px-8">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="max-w-4xl mx-auto pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Card className="max-w-lg w-full border-none shadow-none bg-white/60 backdrop-blur-md">
                  <CardContent className="px-6 py-8">
                    <h2 className="text-4xl font-bold text-[#8E80FC] mb-2">Ready when you are!</h2>
                  </CardContent>
                </Card>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {[
                    "Summarize the document...",
                    "What are the key takeaways from this topic?",
                    "Can you list all the citations?",
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputValue(suggestion)}
                      className="cursor-pointer text-sm px-4 py-3 rounded-lg max-w-xs shadow-lg border border-[#8E80FC40] bg-[#8E80FC10] text-[#8E80FC] hover:bg-[#8E80FC20] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                {messages.map((message) => (
                  <div key={message.id} data-message>
                    <Message message={message} />
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3 justify-start items-center" data-message>
                    <Avatar className="h-8 w-8 border-2" style={{ borderColor: "#8E80FC20" }}>
                      <AvatarFallback style={{ backgroundColor: "#8E80FC", color: "white" }} className="text-xs">
                        <Flower className="h-4 w-4 animate-spin" />
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm leading-relaxed text-slate-500 whitespace-pre-wrap">June is thinking...</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-shrink-0 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-2 flex-col">
            <Button
              onClick={() => setIsWebSearchAllowed((allowed) => !allowed)}
              disabled={!inputValue.trim()}
              size="sm"
              className="h-fit w-fit text-xs px-3 py-2 rounded-lg text-white self-start"
              style={{ backgroundColor: "#8E80FC" }}
            >
              {isWebSearchAllowed ? "Allowed" : "Allow"} Web Search <Search className="w-4 h-4 ml-1" />
            </Button>
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask something..."
                className="min-h-[60px] pr-14 resize-none rounded-xl border-border/60 focus-visible:ring-1 focus-visible:ring-[#8E80FC] focus-visible:ring-offset-0 focus-visible:border-[#8E80FC]"
                style={{ borderColor: "#8E80FC40" }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || loading}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-lg text-white disabled:opacity-50"
                style={{ backgroundColor: "#8E80FC" }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
