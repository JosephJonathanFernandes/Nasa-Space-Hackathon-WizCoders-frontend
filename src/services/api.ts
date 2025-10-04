/**
 * API service for backend communication
 * Centralized endpoint configuration for FastAPI integration
 */

// Backend base URL - Update this when FastAPI backend is deployed
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:8000";

/**
 * Upload and analyze CSV dataset
 * @param file - CSV file to analyze
 * @returns Analysis results including light curve and candidates
 */
export const analyzeDataset = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
};

/**
 * Send chat message to RAG AI assistant
 * @param messages - Conversation history
 * @returns AI response
 */
export const sendChatMessage = async (messages: { role: string; content: string }[]) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
};
