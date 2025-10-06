/**
 * API service for backend communication
 * Centralized endpoint configuration for FastAPI integration
 */

// Backend base URL - prefers Vite env, defaults to deployed backend
export const API_BASE_URL = (
  import.meta.env?.VITE_API_URL ||
  "https://giz17-space.hf.space"
).replace(/\/+$/, "");

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
 * Predict exoplanet candidates from CSV file
 * @param file - CSV file to predict
 * @returns Prediction results [{ id, label }]
 */
export const predictExoplanets = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
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

/**
 * Post a chat question to the backend chat endpoint.
 * Uses JSON body and a default timeout. Returns parsed JSON response.
 */
export const postChat = async (
  payload: { question: string; top_k?: number; stream?: boolean },
  timeoutMs = 30000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      // try to parse error details from json body
      let errText = `${res.status} ${res.statusText}`;
      try {
        const j = await res.json();
        if (j && (j.detail || j.error || j.message)) errText = j.detail || j.error || j.message;
      } catch (e) {
        // ignore JSON parse errors
      }
      throw new Error(errText);
    }

    return res.json();
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw e;
  } finally {
    clearTimeout(id);
  }
};
