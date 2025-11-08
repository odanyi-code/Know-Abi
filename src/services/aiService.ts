import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCOq_2SDRdUNe6oolfkV5K6Ck5Q5EozOkw';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateFlashcard = async (topic: string = "random"): Promise<{question: string, answer: string}> => {
  try {
    let prompt: string;
    
    if (!topic || topic.toLowerCase() === "random") {
      prompt = `Please create a short flashcard for students. Provide the response in the following format exactly:
Question: [question text]
Answer: [answer text]`;
    } else {
      prompt = `Please create a short flashcard for students on the topic of \"${topic}\". Provide the response in the following format exactly:
Question: [question text]
Answer: [answer text]`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract question and answer
    const parts = text.split('Answer:');
    if (parts.length !== 2) {
      throw new Error('Invalid response format');
    }

    const question = parts[0].replace('Question:', '').trim();
    const answer = parts[1].trim();

    return { question, answer };
  } catch (error) {
    console.error('Error generating flashcard:', error);
    throw error;
  }
};