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
import ChatSingleMessage from "./ChatSingleMessage";

export interface Props {
  feedback: boolean;
  aboutMe: any;
}

const ChatMessages = (props: Props) => {
  const [aiChat, setAiChat] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [usage, setUsage] = useState<any>([]);

  const [blockedByTokenLimits, setBlockedByTokenLimits] = useState<boolean>(false);

  const [chatBeginAt, setChatBeginAt] = useState<any>();
  const [userID, setUserID] = useState<any>();

  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const blockInput = () => {
    setBlockedByTokenLimits(true)
  };

  const getUsedTokens = (usedTokens: string) => {
    addToConversation(userID, messages, chatBeginAt, usedTokens);
  };

  useEffect(() => {
    (async () => {
      const cutrrentDate = getDate();
      setChatBeginAt(cutrrentDate);
      const userIDdata = await getIp();
      setUserID(userIDdata);

      const data = await checkUserByDateAndIp(cutrrentDate, userIDdata);
      const system =
        "Jesteś programistą Javascript , rozmówcą jest rekruter lub potencjalny pracodawca. Formą rozmowy jest czat załączony do CV, zaprezentuj sie jak najlepiej, odpowiadaj krótko w jednym zdaniu. rekruter będzie zadawał kolejne pytania. Twoja odpowiedź będzie wyświetlana w wiadomości chatu. możesz dodać formatowanie tekstu. Nie podawaj od razu wszystkich informacji i nie twórz obszernych opisów tylko tak aby zachęcić do dopytywania. Jeśli podajesz linki lub inne dane to unikaj dodawania nawiasów i innych oznaczeń to bardzo ważne. Aktualna data to:" +
        cutrrentDate +
        "wszystkie dane których potrzebujesz posiadam w bazie danych -  wywołaj odpowiednią funkcję, nigdy nie odpowiadaj bez pobrania danych chyba że informacje masz w swojej historii i nie zmyślaj od tego zależy nasza praca!";

      const newAiChat = new OpenAiChat(system);
      setAiChat(newAiChat);
      if (data) {
        const prevMessages = data[1]?.history;

        if (prevMessages) {
          newAiChat.initiateChat(prevMessages, { total_tokens: data[0]?.usedTokens });
          setMessages(prevMessages);
          setUsage({ 0: { total_tokens: data[0]?.usedTokens } });
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const AImessage = async (userText: string) => {
    const ans = await aiChat.say(userText);

    const functionCallLoop = async (ans: any): Promise<any> => {
      if (ans.content) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { role: "assistant", content: ans.content },
        ]);
        setUsage((prevState: any) => ({
          ...prevState,
          ...aiChat.usage,
        }));
      }

      if (ans.toolCall) {
        const res = await handleCalledFunction(ans.toolCall[0].function);
        const ans2 = await aiChat.say(
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
      {chatBeginAt && <ChatLimiter usage={usage} chat={aiChat} currentDate={chatBeginAt} blockInput={blockInput}/>}

      <div className="message-container" ref={messageContainerRef}>
        <ChatSingleMessage messages={messages} />
      </div>
      { blockedByTokenLimits ?(
        <div className="send-button">
          Przekroczono dzienny limit tokenów
        </div>
      ) : (
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="zadaj mi pytanie..."
            className="input-field"
          />
          <button onClick={handleSendMessage} className="send-button">
            Wyślij
          </button>
        </div>
      )}
    </>
  );
};

export default ChatMessages;
