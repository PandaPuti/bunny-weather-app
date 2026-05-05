import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const useAINarrator = () => {
  const [thought, setThought] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const generateThought = async (weatherInfo, bunnyAction) => {
    setIsThinking(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are a tiny, cute bunny living in a house on a green field. 
      The current weather is ${weatherInfo}. Your current task is: ${bunnyAction}. 
      Write a 1-sentence witty and cute internal monologue (max 15 words) about your situation. 
      Don't use emojis.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setThought(response.text());
    } catch (error) {
      console.error("AI Error:", error);
      setThought("I hope my carrots don't get too wet...");
    } finally {
      setIsThinking(false);
    }
  };

  return { thought, isThinking, generateThought };
};