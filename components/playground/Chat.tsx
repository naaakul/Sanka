"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, ArrowUp } from "lucide-react";
import { ChatMessage } from "../ui/ChatMessage";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm Gemini, your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col rounded-lg border border-neutral-800 overflow-hidden">
      <div className="h-full flex flex-col px-2 pb-2">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-amber-600" : "bg-blue-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Chat bubble */}
                {message.role === "user" ? (
                  <div className="max-w-[80%] rounded-lg p-3 bg-amber-600 text-white">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ) : (
                  <ChatMessage avatarUrl="https://avatars.githubusercontent.com/u/178046049?s=200&v=4" message="sergrdhdfh" side="right"/>
                  // <div className="border border-gray-200 relative rounded-[16px] bg-gray-200 text-black max-w-[80%] px-3 py-1.5 transition-colors min-w-0 break-words">
                  //   <svg
                  //     width="16"
                  //     height="16"
                  //     className="absolute -top-[6px] right-0 transition-transform"
                  //   >
                  //     <path
                  //       d="M-2.70729e-07 6.19355C8 6.19355 12 4.12903 16 6.99382e-07C16 6.70968 16 13.5 10 16L-2.70729e-07 6.19355Z"
                  //       fill="#E5E7EB"
                  //     ></path>
                  //   </svg>
                  //   <div className="prose prose-sm prose-gray min-w-0 break-words w-full">
                  //     <p className="text-sm whitespace-pre-wrap">
                  //       {message.content}
                  //     </p>
                  //     <p className="text-xs opacity-70 mt-1">
                  //       {message.timestamp.toLocaleTimeString([], {
                  //         hour: "2-digit",
                  //         minute: "2-digit",
                  //       })}
                  //     </p>
                  //   </div>
                  // </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask to follow "
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* <div className="w-full max-w-xs sm:max-w-md md:max-w-lg xl:max-w-3xl z-30 h-10 sm:h-12 bg-background rounded-lg border border-[#292929] flex items-center">
          <input
            type="text"
            placeholder="Ask to follow up..."
            className="flex-1 h-full outline-0 caret-neutral-400 border-0 px-3 sm:px-4 bg-transparent text-foreground text-sm sm:text-base placeholder:text-neutral-500 placeholder:text-sm sm:placeholder:text-base"
          />
          <div className="p-1 h-full">
            <button className="h-full aspect-square bg-neutral-400 rounded-lg shrink-0 flex items-center justify-center hover:bg-neutral-300 transition-colors duration-200 active:scale-95">
              <ArrowUp className="text-black w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Chat;
