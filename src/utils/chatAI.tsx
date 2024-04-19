import OpenAI from "openai";
import { API_KEY } from "../services/aiConfig";
import {
  ChatCompletion,
} from "openai/resources/chat/completions";

const extractFirstChoiceText = (
  msg: OpenAI.Chat.Completions.ChatCompletion
): string | null => {
  return msg?.choices?.[0]?.message?.content ?? null;
};

export class OpenAiChat {
  private readonly openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // do usunięcia
  });
  private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    [];

  constructor(system: string) {
    this.messages = [
      {
        role: "system",
        content: system,
      },
    ];
  }

  async say(prompt: string): Promise<any | string> {
    console.log(this.messages);
    this.messages.push({
      role: "user",
      content: prompt,
    });
  
    try {
      const data = await this.openai.chat.completions.create({
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
        model: "gpt-4-turbo-preview",
        messages: this.messages,
      });
  
      const s = extractFirstChoiceText(data as ChatCompletion);
  
      if (s) {
        this.messages.push({
          role: "assistant",
          content: s,
        });
  
       return s;
      } else {
        return "Nie udało się uzyskać odpowiedzi.";
      }
    } catch (error) {
      return "Wystąpił błąd w komunikacji z serwerem AI.";
    }
  }
  

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }
}
