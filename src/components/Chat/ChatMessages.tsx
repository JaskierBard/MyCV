import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { OpenAiChat } from "../../utils/chatAI";

export interface Props {
    feedback: boolean;
  }

const ChatMessages = (props:Props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (props.feedback === true) {
        setMessages((prevMessages) => [...prevMessages, "Zaczekaj! Jeśli zamkniesz to okno wiadomości zostaną usunięte, przed zamknięciem daj mi feedback"]);
    }
  }, [props.feedback]);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
      setMessages((prevMessages) => [...prevMessages, "."]);

      const dotsArray = [".", "..", "..."];
      let index = 0;
      const intervalId = setInterval(() => {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          dotsArray[index],
        ]);
        index = (index + 1) % dotsArray.length;
      }, 500);

      const response = await AImessage(inputValue);

      clearInterval(intervalId);
      setMessages((prevMessages) => [...prevMessages.slice(0, -1), response]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const AImessage = async (userText: string) => {
    console.log(userText);
    const system =
      "Jesteś programistą Javascript masz na imie Mateusz i szukasz pracy, rozmówcą jest rekruter lub potencjalny pracodawca, zaprezentuj sie jak najlepiej, odpowiadaj krótko w jednym zdaniu. rekruter będzie zadawał kolejne pytania";
    const chat = new OpenAiChat(system);
    const res = await chat.say(userText);
    // console.log(res);
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${index % 2 !== 0 ? "ai-message" : ""}`}
            style={{ width: `${getMessageWidth(message)}px` }}
          >
            {message}
          </div>
        ))}
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
