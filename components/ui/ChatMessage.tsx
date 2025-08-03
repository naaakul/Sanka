"use client";
import Image from "next/image";

interface ChatMessageProps {
  avatarUrl: string;
  message: string;
  side?: "left" | "right";
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  avatarUrl,
  message,
  side = "right",
}) => {
  const isRight = side === "right";

  return (
    <div
      className={`group w-full flex flex-col gap-2 items-${isRight ? "end" : "start"}`}
    >
      {/* Avatar */}
      <div className={`flex items-center gap-1.5 ${isRight ? "pr-1" : "pl-1"}`}>
        <span className="bg-alpha-400 relative flex shrink-0 items-center justify-center overflow-hidden size-4 rounded-full">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={16}
            height={16}
            className="rounded-full object-cover"
          />
        </span>
      </div>

      {/* Message bubble */}
      <div className={`flex items-end max-w-[90%] sm:max-w-[80%] ${isRight ? "justify-end" : "justify-start"}`}>
        <div className="relative border border-gray-200 bg-gray-200 rounded-2xl px-3 py-1.5 text-sm text-gray-900">
          {message}
          <svg
            width="16"
            height="16"
            className={`absolute -top-[6px] ${isRight ? "right-0" : "left-0 rotate-180"}`}
            fill="#E5E7EB"
          >
            <path d="M0 6.2C8 6.2 12 4.1 16 0C16 6.7 16 13.5 10 16L0 6.2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
