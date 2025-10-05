import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Sparkles } from "lucide-react";

/**
 * AI chatbot interface with conversation history
 * Maintains context and displays messages
 */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  // onSendMessage should return the assistant's reply text (or undefined/null on error)
  onSendMessage: (message: string) => Promise<string | void>;
  isLoading: boolean;
}

export const ChatInterface = ({ onSendMessage, isLoading }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your ExoScope research assistant. I can help you understand exoplanet detection, light curve analysis, and interpret your dataset results. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call backend (placeholder - will be connected to FastAPI)
    const assistantContent = await onSendMessage(content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        assistantContent && assistantContent.length > 0
          ? assistantContent
          : "This is a placeholder response. The actual AI assistant will be connected to the FastAPI backend with RAG capabilities to provide intelligent answers about your exoplanet data.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 glass border-border/30 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Sparkles className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold">Data Research Assistant</h3>
              <p className="text-sm text-muted-foreground">Powered by RAG AI</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <MessageBubble
              message={{
                id: "loading",
                role: "assistant",
                content: "",
                timestamp: new Date(),
              }}
              isLoading
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/30">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </Card>
    </div>
  );
};
