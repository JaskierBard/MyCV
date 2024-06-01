import OpenAI from "openai";
import { API_KEY } from "../services/aiConfig";
import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionRole,
} from "openai/resources/chat/completions";
import { CompletionUsage } from "openai/resources";

const parameters: ChatCompletionCreateParamsBase = {
  n: 1,
  top_p: 1,
  temperature: 1,
  max_tokens: 1000,
  stream: false,
  model: "gpt-4-1106-preview",

  messages: [],
  tools: [
    {
      type: "function",
      function: {
        name: "getInformations",
        description:
          "Always use this functionCall when user is need some informations or asks about something and you dont have it its very important. Never dream up",
        parameters: {
          type: "object",
          properties: {
            informations: {
              type: "string",
              description: "give me only pure enum",
              enum: [
                "certifications",
                "personalDetails",
                "projects",
                "skills",
                "aboutCV",
                "accessibility",
              ],
            },
          },
        },
      },
    },
    {
      type: "function",
      function: {
        name: "answerWithInformations",
        description:
          "Always use when you already recieved infrmation to answer",
        parameters: {
          type: "object",
          properties: {
            informations: {
              type: "string",
              description: "Answer about",
            },
          },
        },
      },
    },
    {
      type: "function",
      function: {
        name: "getPictures",
        description:
          'Use this function call to get all picture names from storage and then choose correct ones, show one and ask about more. Show only link wrapped on <img class="picture" src=linkhere/>',
        parameters: {
          type: "object",
          properties: {
            informations: {
              type: "string",
              description: "Get pictures",
            },
          },
        },
      },
    },
  ],
};

export type ChatResponse = null | {
  content: null | string;
  toolCall: null | ChatCompletionMessageToolCall[];
  usage: null | CompletionUsage;
};

const extractFirstChoice = (
  msg: OpenAI.Chat.Completions.ChatCompletion
): ChatResponse => {
  const firstChoice = msg?.choices?.[0]?.message;
  const usage = msg.usage;
  if (!firstChoice) {
    return null;
  }

  return {
    content: firstChoice.content ?? null,
    toolCall: firstChoice.tool_calls ?? null,
    usage: usage ?? null,
  };
};

export class OpenAiChat {
  private readonly openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });
  private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  private readonly usage: CompletionUsage[];

  constructor(system: string) {
    this.messages = [
      {
        role: "system",
        content: system,
      },
    ];
    this.usage = [];
  }

  async initiateChat(
    previousMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    usage: any
  ): Promise<void> {
    if (previousMessages && previousMessages.length > 0) {
      this.messages.push(...previousMessages);
      this.usage.push(usage);
    }
  }

  async say(
    prompt: string,
    role: ChatCompletionRole = "user",
    toolName?: string
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
        role: "assistant",
        content: msg.content,
      });
    }
    if (msg.usage) {
      this.usage.push(msg.usage);
    }

    return msg;
  }

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }

  get getUsage() {
    return this.usage;
  }
}
