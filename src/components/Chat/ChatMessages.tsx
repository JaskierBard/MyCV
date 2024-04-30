import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { OpenAiChat } from "../../utils/chatAI";
import {
  addToConversation,
  checkUserByDateAndIp,
  getAboutMe,
  sumUsedTokensFromDate,
} from "../../services/firebaseChatService";
import { convertTextToHyperlinks } from "../../utils/convertTextToHyperlinks";
import { handleCalledFunction } from "../../utils/callable-functions";
import { getDate } from "../../utils/getDate";
import { getIp } from "../../utils/getIp";
import ChatLimiter from "./ChatLimiter";

export interface Props {
  feedback: boolean;
  aboutMe: any;
  userId: string;
}

const ChatMessages = (props: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const [chat, setChat] = useState<any>();
  const [usage, setUsage] = useState<any>([]);

  const [chatBeginAt, setChatBeginAt] = useState<any>();
  const [userID, setUserID] = useState<any>();


  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getUsedTokens = (usedTokens: string) => {
    addToConversation(props.userId, messages, chatBeginAt, usedTokens);
  };

  useEffect(() => {
    (async () => {
      const cutrrentDate = getDate();
      const totalUsedTokens = sumUsedTokensFromDate(cutrrentDate);
      setChatBeginAt(cutrrentDate);
      const userIDdata = await getIp()
      setUserID(userIDdata);

      const data = await checkUserByDateAndIp(cutrrentDate, userIDdata);
      const system =
        "Jesteś programistą Javascript , rozmówcą jest rekruter lub potencjalny pracodawca. Formą rozmowy jest czat załączony do CV, zaprezentuj sie jak najlepiej, odpowiadaj krótko w jednym zdaniu. rekruter będzie zadawał kolejne pytania. Twoja odpowiedź będzie wyświetlana w wiadomości chatu. możesz dodać formatowanie tekstu. Nie podawaj od razu wszystkich informacji i nie twórz obszernych opisów tylko tak aby zachęcić do dopytywania. Jeśli podajesz linki lub inne dane to unikaj dodawania nawiasów i innych oznaczeń to bardzo ważne. Aktualna data to:" +
        cutrrentDate +
        "wszystkie dane których potrzebujesz posiadam w bazie danych -  wywołaj odpowiednią funkcję, nigdy nie odpowiadaj bez pobrania danych i nie zmyślaj od tego zależy nasza praca!";

      const xd = new OpenAiChat(system);
      setChat(xd);
      if (data) {
        const prevMessages = data[1]?.history;
        console.log(prevMessages);
        if (prevMessages) {
          xd.initiateChat(prevMessages);
          setMessages(prevMessages);
        }
      }
    })();
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: "user", content: inputValue },
      ]);
      setInputValue("");
      await AImessage(inputValue);

      // const {input, output} = chat.spend[0].spend

      // console.log('input: ' + input + '\noutput: ' + output + '\n'+ await getIp());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const AImessage = async (userText: string) => {
    const ans = await chat.say(userText);

    const functionCallLoop = async (ans: any): Promise<any> => {
      if (ans.content) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { role: "assistant", content: ans.content },
        ]);
        setUsage((prevState: any) => ({
          ...prevState,
          ...chat.usage,
        }));
      }

      if (ans.toolCall) {
        const res = await handleCalledFunction(ans.toolCall[0].function);
        const ans2 = await chat.say(
          JSON.stringify(res),
          "function",
          ans.toolCall[0].function.name
        );
        return await functionCallLoop(ans2);
      }
    };

    await functionCallLoop(ans);
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <ChatLimiter usage={usage} chat={chat} getUsedTokens={getUsedTokens} />

      <div className="message-container" ref={messageContainerRef}>
        {messages.map(
          (
            message: { role: string; content: string },
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className={`message ${
                message.role === "assistant" ? "ai-message" : ""
              }`}
              style={{ width: `${getMessageWidth(message.content)}px` }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: message.content,
                }}
              />
            </div>
          )
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Zadaj mi pytanie..."
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button">
          Wyślij
        </button>
      </div>
    </>
  );
};

const getMessageWidth = (text: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = "14px Arial";
    const width = context.measureText(text).width;
    return width + 20;
  }
  return 200;
};

export default ChatMessages;
