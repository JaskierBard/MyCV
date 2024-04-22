import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { OpenAiChat } from "../../utils/chatAI";
import {
  addToConversation,
  getAboutMe,
} from "../../services/firebaseChatService";
import { convertTextToHyperlinks } from "../../utils/convertTextToHyperlinks";

export interface Props {
  feedback: boolean;
}

const ChatMessages = (props: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const [chat, setChat] = useState<any>();
  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      const jsonData = JSON.stringify(data);
      const system =
        "Jesteś programistą Javascript , rozmówcą jest rekruter lub potencjalny pracodawca, zaprezentuj sie jak najlepiej, odpowiadaj krótko w jednym zdaniu. rekruter będzie zadawał kolejne pytania. Tutaj podaje w obiekcie wszystkie potrzebne dane:" +
        jsonData +
        "Twoja odpowiedź będzie wyświetlana w wiadomości chatu. możesz dodać formatowanie tekstu. Nie podawaj od razu wszystkich informacji i nie twórz obszernych opisów tylko tak aby zachęcić do dopytywania. Jeśli podajesz linki lub inne dane to unikaj dodawania nawiasów i innych oznaczeń to bardzo ważne";

      const xd = new OpenAiChat(system);
      setChat(xd);
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
      setMessages(chat.history.slice(1));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const AImessage = async (userText: string) => {
    const res = await chat.say(userText);
    return res;
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
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
                  __html: convertTextToHyperlinks(message.content),
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
    return width + 10;
  }
  return 200;
};

export default ChatMessages;
