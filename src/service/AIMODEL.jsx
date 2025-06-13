// AIMODEL.jsx
import { GoogleGenAI } from '@google/genai';

let chatSession = null;

// You can adjust this value as needed
const TOKEN_LIMIT = 8192; // Example: limit to 1024 output tokens

export async function generateTravelPlan(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
  });

  // Create a chat session if it doesn't exist
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-1.5-flash',
      history: [],
      config: {
        maxOutputTokens: TOKEN_LIMIT,
        temperature: 1,
        topP: 0.95,
        topK: 64,
        responseMimeType: 'application/json',
      },
    });
  }

  // Send the user message as part of the chat session, with config for token limit
  const response = await chatSession.sendMessage({
    message: prompt,
    config: {
      maxOutputTokens: TOKEN_LIMIT, // This ensures each response also respects the limit
    },
  });

  return response.text;
}

export function resetChatSession() {
  chatSession = null;
}
