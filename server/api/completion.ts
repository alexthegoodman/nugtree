import OpenAI from "openai";
import { OpenAIStream } from "ai";
import {
  ChatCompletionMessageParam,
  CreateChatCompletionRequestMessage,
} from "openai/resources/chat";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event) => {
    // Extract the `prompt` from the body of the request
    const data = await readBody(event);
    const { prompt } = JSON.parse(data);

    console.info("Prompt:", prompt, event.toJSON());

    const messages = [
      {
        content:
          "Hey there! I'm an expert in cannabis, horticulture, and botany. I will help you with details, facts and figures, and helpful links on cannabis.",
        role: "system",
      },
      {
        content: prompt,
        role: "user",
      },
    ] as ChatCompletionMessageParam[];

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    return OpenAIStream(response);
  });
});
