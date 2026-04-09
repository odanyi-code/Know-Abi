import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);
// Daha hızlı ve trafik yoğunluğundan daha az etkilenen "lite" sürümü
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateFlashcard = async (topic: string = "random", retryCount = 0): Promise<{question: string, answer: string}> => {
  try {
    let prompt: string;
    
    // Daha sade, net ve "lite" modelin kolay anlayıp en iyi sonucu vereceği prompt yapısı
    const basePrompt = `Kullanıcı için harika bir "bilgi kartı" (flashcard) hazırlamalısın.
Kurallar:
1. Soru çok net, akıcı ve merak uyandırıcı olmalı.
2. Cevap kısa, anlaşılır ve doğrudan konuyu özetlemeli. Uzun paragraflardan kaçın.
3. Cevabın son satırına konuyu akılda tutmayı kolaylaştıracak tek cümlelik kısa bir eğlenceli gerçek, ipucu veya örnek ekleyebilirsin.

YANITI KESİNLİKLE ŞU FORMATTA VE TÜRKÇE OLARAK VERMELİSİN:

Question: [Buraya soruyu yaz]
Answer: [Buraya net cevabı ve varsa ufak ipucunu yaz]`;

    if (!topic || topic.toLowerCase() === "random") {
      prompt = `${basePrompt}\n\nLütfen genel kültür, bilim, felsefe veya tarih alanlarından çok ilginç ve ufuk açıcı rastgele bir konu seçerek kartı oluştur.`;
    } else {
      prompt = `${basePrompt}\n\nKonu: "${topic}". Lütfen bu konunun en kritik, öğrenilmesi en önemli veya en şaşırtıcı mekanizmasını ele alarak kartı oluştur.`;
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
  } catch (error: any) {
    console.error('Error generating flashcard:', error);
    
    // Eğer 503 Server Busy veya 429 Rate Limit hatası alırsak otomatik tekrar deneme mekanizması (Retry Logic)
    if (retryCount < 3 && error.message && (error.message.includes('503') || error.message.includes('429'))) {
      console.warn(`Sunucu yoğun (503/429). ${retryCount + 1}. tekrar deneme yapılıyor...`);
      await sleep(2000); // 2 saniye bekleyip tekrar istek atıyoruz
      return generateFlashcard(topic, retryCount + 1);
    }
    
    throw error;
  }
};