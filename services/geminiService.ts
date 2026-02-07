
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const queryJarvisKnowledgeBase = async (query: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: "You are Jarvis, an expert AI assistant for UK financial advisors. You have access to vast knowledge about FCA regulations, tax rules (VCT, EIS, ISA, Pensions), and provider turnaround times. Provide concise, professional, and actionable insights. If referencing regulations, mention specific sections if possible.",
      tools: [{ googleSearch: {} }],
    },
  });
  
  // Extract web grounding chunks if available
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = groundingChunks
    .filter(chunk => chunk.web)
    .map(chunk => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    }));

  return {
    text: response.text,
    sources: sources
  };
};

export const getJarvisAssistantResponse = async (query: string, context: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Context: ${context}\n\nUser Question: ${query}`,
    config: {
      systemInstruction: "You are Jarvis, an AI integrated into a financial advisory platform. You are helping an advisor manage a specific client case. Use the provided context about the client to answer questions. Be helpful, professional, and prioritize compliance and client best-interest.",
    },
  });
  
  return response.text;
};

export const generateClientReportSummary = async (clientData: any) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a draft suitability report summary for ${clientData.name}. Risk Profile: ${clientData.riskProfile}. Goals: Retirement Planning.`,
      config: {
        systemInstruction: "You are an expert paraplanner. Generate professional summary sections for suitability reports.",
      },
    });
    return response.text;
};
