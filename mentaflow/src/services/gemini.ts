import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function getStudyAdvice(stats: any, currentSession: any) {
  if (!ai) return "Configura la tua API key Gemini per ricevere consigli AI.";
  const model = "gemini-3-flash-preview";
  const prompt = `
    Sei un assistente AI esperto in produttività e studio universitario per l'app "MentaFlow".
    Dati attuali:
    - Ore totali studiate: ${stats.totalHours}
    - Streak: ${stats.streak} giorni
    - Obiettivo settimanale: ${stats.weeklyTarget} min
    - Sessione attuale: ${currentSession?.subjectName || 'Nessuna'}

    In base a questi dati, fornisci un breve consiglio motivazionale e pratico (massimo 2 frasi).
    Sii moderno, tech-friendly e motivante.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Continua così! La costanza è la chiave del successo.";
  }
}

export async function chatWithAi(history: any[], message: string) {
  if (!ai) return "Configura la tua API key Gemini per usare la chat AI.";
  const model = "gemini-3-flash-preview";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(m => ({ 
          role: m.role === 'assistant' ? 'model' : 'user', 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mi dispiace, ho avuto un blackout neurale. Prova a ricaricare!";
  }
}

export async function generateQuiz(notes: string) {
  if (!ai) return [];
  const model = "gemini-3-flash-preview";
  const prompt = `
    Genera 3 domande a scelta multipla basate sui seguenti appunti:
    "${notes}"
    
    Ritorna un array JSON con questo formato:
    [{ "question": "", "options": ["", "", ""], "answer": index }]
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
