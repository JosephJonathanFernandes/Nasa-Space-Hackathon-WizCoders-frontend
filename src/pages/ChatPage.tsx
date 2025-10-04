import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";

/**
 * Chat page with AI research assistant
 * RAG-powered chatbot for dataset queries
 */
const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);

    // Simulate API call to backend /chat endpoint
    // Replace with actual fetch to FastAPI backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-6 animate-fade-in">
            <h1 className="text-4xl font-bold">Ask the Data Assistant</h1>
            <p className="text-xl text-muted-foreground">
              Get intelligent insights about exoplanet detection and your datasets
            </p>
          </div>
          <ChatInterface onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
