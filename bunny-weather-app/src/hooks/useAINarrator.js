import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const useAINarrator = () => {
  const [thought, setThought] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const weatherStateThought = {
    Clear: "Clear blue sky, warm sun on my fur—time for a joyful, care-free hop!",
    Haze: "Too hazy to hop, too stuffy to stop—time for a shady nap and a carrot-munching session inside.",
    Clouds: "Perfect weather for a cozy, long nap at home.",
    Rain: "Too wet to hop, too gloomy to play, I guess I'll nap the rain away",
    Drizzle:"Damp nose, wet toes, guess it's time for a long, cozy nap inside.",
    Thunderstrom:"Is the sky thumping back at me because I didn't finish my hay?",
    Mist:"The world has turned into a soft, quiet carrot, just waiting to be nibbled.",
    Storm: "Need to find a deep, dry hole fast before my ears turn into wind sails!",
  };

  const generateThought = async (weatherInfo, bunnyAction, weatherCondition) => {
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

      setThought(weatherStateThought[weatherCondition]);
    } finally {
      setIsThinking(false);
    }
  };

  return { thought, isThinking, generateThought };
};