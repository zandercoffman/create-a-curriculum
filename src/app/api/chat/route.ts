import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
export const dynamic = 'force-dynamic';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response('Missing API key configuration for chat route.', { status: 500 });
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });
  
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    stream: true,
    messages,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
