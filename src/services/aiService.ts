import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCOq_2SDRdUNe6oolfkV5K6Ck5Q5EozOkw';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateFlashcard = async (topic: string = "random"): Promise<{question: string, answer: string}> => {
  try {
    let prompt: string;
    
    if (!topic || topic.toLowerCase() === "random") {
      prompt = `Lütfen öğrenciler için kısa bir bilgi kartı oluştur. Yanıtı tam olarak şu formatta ver:
Soru: [soru metni]
Cevap: [cevap metni]`;
    } else {
      prompt = `Lütfen "${topic}" konusu hakkında öğrenciler için kısa bir bilgi kartı oluştur. Yanıtı tam olarak şu formatta ver:
Soru: [soru metni]
Cevap: [cevap metni]`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract question and answer
    const parts = text.split('Cevap:');
    if (parts.length !== 2) {
      throw new Error('Invalid response format');
    }

    const question = parts[0].replace('Soru:', '').trim();
    const answer = parts[1].trim();

    return { question, answer };
  } catch (error) {
    console.error('Error generating flashcard:', error);
    throw error;
  }
};