import OpenAI from "openai";
import { API_KEY } from "../services/aiConfig";
import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from "openai/resources/chat/completions";


const parameters: ChatCompletionCreateParamsBase = {
  n: 1, // liczba odpowiedzi, nie zawsze działa
  top_p: 1, // im większe tym bardziej kreatywny, lepiej bawić się tylko temperaturą
  temperature: 1, // im większe tym bardziej kreatywny, nie zmieniać obu na raz
  max_tokens: 1000, // utnie odpowiedź jeśli się przekroczy tokeny
  stream: false, // podaje całą odpowiedź a nie po literce
  model: "gpt-3.5-turbo",
  messages: [],}

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
        ...parameters,
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
