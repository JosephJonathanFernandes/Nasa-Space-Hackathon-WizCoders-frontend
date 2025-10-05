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

    try {
      // Adjust backend base URL as needed. If running locally with uvicorn: http://127.0.0.1:8000
      const base = "http://127.0.0.1:8000";
      const res = await fetch(`${base}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message, top_k: 5, stream: false }),
      });

      if (!res.ok) {
        // Try to parse error details
        let errText = `${res.status} ${res.statusText}`;
        try {
          const j = await res.json();
          if (j.detail) errText = j.detail;
        } catch (e) {
          /* ignore json parse errors */
        }
        throw new Error(errText);
      }

      const data = await res.json();
      // backend returns { answer: string, sources: [...], docs: [...] }
      return data.answer as string;
    } catch (e: unknown) {
      // Return an error message that will be displayed as assistant reply
      const message = e instanceof Error ? e.message : String(e);
      return `Error: ${message}`;
    } finally {
      setIsLoading(false);
    }
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
