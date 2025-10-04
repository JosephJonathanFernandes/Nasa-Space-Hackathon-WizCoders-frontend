import { useState } from "react";
import { sendChatMessage } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

/**
 * Custom hook for managing chat functionality
 * Handles message sending and conversation state
 */
interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.message,
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      toast({
        title: "Message failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};
