import { ChatGroq } from '@langchain/groq';

export const model = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0,
});