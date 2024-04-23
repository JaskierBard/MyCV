import OpenAI from "openai";
import { API_KEY } from "../services/aiConfig";
import {
  ChatCompletion,
  ChatCompletionAssistantMessageParam,
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionRole,
} from "openai/resources/chat/completions";


const parameters: ChatCompletionCreateParamsBase = {
  n: 1, // liczba odpowiedzi, nie zawsze działa
  top_p: 1, // im większe tym bardziej kreatywny, lepiej bawić się tylko temperaturą
  temperature: 1, // im większe tym bardziej kreatywny, nie zmieniać obu na raz
  max_tokens: 1000, // utnie odpowiedź jeśli się przekroczy tokeny
  stream: false, // podaje całą odpowiedź a nie po literce
  model: "gpt-3.5-turbo",
  messages: [],
  tools: [
    {
      type: "function",
      function: {
        name: 'getInformations',
        description: 'Use it when user asks about something',
        parameters: {
            type: 'object',
            properties: {
                informations: {
                    type: 'string',
                    description: 'give me only pure enum',
                    enum: ['certifications', 'personalDetails', 'projects', 'skills'],
                },
            },
        },
      }
        
    },
    // {
    //   type: "function",
    //   function: {
    //     name: 'getInformations',
    //     description: 'Use it when user asks about something',
    //     parameters: {
    //         type: 'object',
    //         properties: {
    //             informations: {
    //                 type: 'string',
    //                 description: 'give me only pure enum',
    //                 enum: ['certifications', 'personalDetails', 'projects', 'skills'],
    //             },
    //         },
    //     },
    //   }
        
    // },
],}

export type ChatResponse = null | {
  content: null | string;
  toolCall: null | ChatCompletionMessageToolCall[];
}

  const extractFirstChoice = (msg: OpenAI.Chat.Completions.ChatCompletion): ChatResponse => {
    const firstChoice = msg?.choices?.[0]?.message;
  
    if (!firstChoice) {
        return null;
    }
  
    return {
        content: firstChoice.content ?? null,
        toolCall: firstChoice.tool_calls ?? null,
    };
  }

export class OpenAiChat {
  private readonly openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // do usunięcia
  });
  private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];

  constructor(system: string) {
    this.messages = [
      {
        role: "system",
        content: system,
      },
    ];
  }

  async say(
    prompt: string,
    role: ChatCompletionRole = 'user',
    toolName?: string,
): Promise<ChatResponse> {
    this.messages.push({
        role,
        content: prompt,
        name: toolName,
    } as ChatCompletionMessageParam);

    const data = await this.openai.chat.completions.create({
        ...parameters,
        messages: this.messages,
    });
    const msg: any = extractFirstChoice(data as ChatCompletion);  

    if (msg.content) {
      this.messages.push({
            role: 'assistant',
            content: msg.content,
          });
    }

    return msg;
}
  

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }
}
