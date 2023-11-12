import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const data = await readBody(event);
  const { prompt } = JSON.parse(data);

  console.info("Structured Prompt:", prompt, event.toJSON());

  const messages = [
    {
      content:
        "Hey there! I'm an expert in cannabis, horticulture, and botany. I will help you with details, facts and figures, and helpful links on cannabis.",
      role: "system",
    },
    {
      content: `What are 5 rare and unique questions to ask about ${prompt}? 
      Please provide your answer as a JSON array of strings, 
      e.g. ["What happens to ${prompt} in 60 degree weather?", "What trace terpenes contribute to the flavor profile of ${prompt}?"]
      Do not add any text around the JSON array.`,
      role: "user",
    },
  ] as ChatCompletionMessageParam[];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    temperature: 1.5,
    messages,
  });

  const text = response.choices[0].message.content;

  console.info("text", text);

  return {
    text,
  };
});
