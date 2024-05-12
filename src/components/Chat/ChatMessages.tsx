import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { OpenAiChat } from "../../utils/chatAI";
import {
  addToConversation,
  checkUserByDateAndIp,
  getSystemPrompt,
} from "../../services/firebaseChatService";
import { handleCalledFunction } from "../../utils/callable-functions";
import { getDate } from "../../utils/getDate";
import { getIp } from "../../utils/getIp";
import ChatLimiter from "./ChatLimiter";
import ChatSingleMessage from "./ChatSingleMessage";

export interface Props {
  feedback: boolean;
  aboutMe: any;
  background: string;
  activeLanguage: {
    [key: string]: string;
  };
  questionBot: string | undefined;
}

const ChatMessages = (props: Props) => {
  const [aiChat, setAiChat] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [newMessageAwait, setNewMessageAwait] = useState<boolean | null>(null);

  const [usage, setUsage] = useState<any>([]);

  const [blockedByTokenLimits, setBlockedByTokenLimits] =
    useState<boolean>(false);

  const [chatBeginAt, setChatBeginAt] = useState<any>();
  const [userID, setUserID] = useState<any>();

  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const blockInput = () => {
    setBlockedByTokenLimits(true);
  };
  useEffect(() => {
    (async () => {
      const cutrrentDate = getDate();
      setChatBeginAt(cutrrentDate);
      const userIDdata = await getIp();
      setUserID(userIDdata);
      const data = await checkUserByDateAndIp(cutrrentDate, userIDdata);
      const newAiChat = new OpenAiChat(
        (await getSystemPrompt("mainChat")) + cutrrentDate
      );
      setAiChat(newAiChat);
      if (data) {
        const prevMessages = data[1]?.history;

        if (prevMessages) {
          newAiChat.initiateChat(prevMessages, {
            total_tokens: data[0]?.usedTokens,
          });
          setMessages(prevMessages);
          setUsage({ 0: { total_tokens: data[0]?.usedTokens } });
        }
      }
    })();
  }, []);
// potem odkomentować ":) "
  // useEffect(() => {
  //   (async () => {
      
  //     if (props.questionBot !== undefined && aiChat !== undefined) {
  //       setNewMessageAwait(true);
  //       console.log(props.questionBot)
  //       await AImessage(props.questionBot);
  //   }
  // })();

  // }, [props.questionBot, aiChat]);


  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: "user", content: inputValue },
      ]);
      setInputValue("");
      setNewMessageAwait(true);
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
        setNewMessageAwait(false);
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
      {chatBeginAt && (
        <ChatLimiter
          usage={usage}
          messages={messages}
          currentDate={chatBeginAt}
          blockInput={blockInput}
          userID={userID}
          newMessageAwait={newMessageAwait}
          activeLanguage={props.activeLanguage}
        />
      )}

      <div
        className="message-container"
        ref={messageContainerRef}
        style={{ background: props.background }}
      >
        <ChatSingleMessage
          messages={messages}
          newMessageAwait={newMessageAwait}
        />
      </div>
      {blockedByTokenLimits ? (
        <div className="send-button">Przekroczono dzienny limit tokenów</div>
      ) : (
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={props.activeLanguage["placeholder"]}
            className="input-field"
            style={{ background: props.background }}
          />
          <button onClick={handleSendMessage} className="send-button">
            {props.activeLanguage["send"]}
          </button>
        </div>
      )}
    </>
  );
};

export default ChatMessages;
