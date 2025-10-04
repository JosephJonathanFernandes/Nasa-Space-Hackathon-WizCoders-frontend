import { Message } from "./ChatInterface";
import { User, Bot, Loader2 } from "lucide-react";

/**
 * Individual message bubble component
 * Displays user or assistant messages with appropriate styling
 */
interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  if (isLoading) {
    return (
      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-lg bg-secondary/10">
          <Bot className="h-5 w-5 text-secondary" />
        </div>
        <div className="flex-1 p-4 rounded-xl bg-card/50 border border-border/30">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`p-2 rounded-lg ${isUser ? "bg-primary/10" : "bg-secondary/10"}`}>
        {isUser ? (
          <User className="h-5 w-5 text-primary" />
        ) : (
          <Bot className="h-5 w-5 text-secondary" />
        )}
      </div>
      <div
        className={`
          flex-1 p-4 rounded-xl border
          ${isUser 
            ? "bg-primary/10 border-primary/30" 
            : "bg-card/50 border-border/30"
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
