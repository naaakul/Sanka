"use client"

import { useState, useRef, useEffect } from "react";
import { ChatSession } from "@/lib/types/codeChat.types"; // adjust import if needed

interface ChatProps {
  chatSession: ChatSession;
  setPrompt: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Chat({ chatSession, setPrompt }: ChatProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [chatSession]);

  function handleSend() {
    if (!input.trim()) return;
    setPrompt(input.trim());
    setInput("");
  }

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col rounded-lg border border-neutral-800 overflow-hidden">
      <div
        className="relative flex-1 overflow-y-auto"
        id="scroll-container"
        ref={scrollRef}
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

        <div className="px-4 py-4 space-y-6 max-w-3xl mx-auto">
          {chatSession.turns.map((turn, i) => (
            <div key={i} className="space-y-3">
              {/* user bubble */}
              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <div className="relative bg-neutral-800 px-3 py-2 rounded-2xl max-w-[80%] text-sm">
                    {turn.user.join(" ")}
                    <svg
                      width="16"
                      height="16"
                      className="absolute -top-[6px] right-0 text-neutral-800"
                      fill="currentColor"
                    >
                      <path d="M0 6.19355C8 6.19355 12 4.12903 16 0C16 6.70968 16 13.5 10 16L0 6.19355Z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* bot bubble */}
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center bg-neutral-600 p-0.5 text-xs">
                    AI
                  </div>

                  <div className="relative bg-neutral-900 px-3 py-2 rounded-2xl max-w-[80%] text-sm">
                    {turn.bot.messages !== "" ? (
                      turn.bot.messages
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="sr-only">Thinking</span>
                        <div className="flex gap-1 items-center">
                          <span
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{ animationDelay: "0s" }}
                          />
                          <span
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{ animationDelay: "0.12s" }}
                          />
                          <span
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{ animationDelay: "0.24s" }}
                          />
                        </div>
                        <span className="text-neutral-500 ml-3 text-xs">
                          Thinking…
                        </span>
                      </div>
                    )}
                    <svg
                      width="16"
                      height="16"
                      className="absolute -top-[6px] left-0 text-neutral-900"
                      fill="currentColor"
                    >
                      <path d="M16 6.19355C8 6.19355 4 4.12903 0 0C0 6.70968 0 13.5 6 16L16 6.19355Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* input */}
      <div className="border-t border-neutral-800 p-3 flex items-center gap-2">
        <textarea
          rows={1}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 resize-none bg-transparent outline-none text-sm placeholder-neutral-500"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-sm hover:bg-neutral-700 transition"
        >
          Send
        </button>
      </div>

      {/* bouncing dots */}
      <style jsx>{`
        .animate-bounce {
          display: inline-block;
          background: #9ca3af;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          animation: chat-bounce 0.6s infinite ease-in-out;
        }
        @keyframes chat-bounce {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
