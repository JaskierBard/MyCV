import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { OpenAiChat } from "../../utils/chatAI";
import { addToConversation, getAboutMe } from "../../services/firebaseChatService";
import { getDate } from "../../utils/getDate";
import { convertTextToHyperlinks } from "../../utils/convertTextToHyperlinks";

export interface Props {
  feedback: boolean;
}


const ChatMessages = (props: Props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [conversationID, setConversationID] = useState<string | null>(null);
  const [conversationLp, setConversationLp] = useState<number>(1);

  const [inputValue, setInputValue] = useState<string>("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (props.feedback === true) {
      setMessages((prevMessages) => [
        ...prevMessages,
        "Zaczekaj! Jeśli zamkniesz to okno wiadomości zostaną usunięte, przed zamknięciem daj mi feedback",
      ]);
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

      const rawResponse = await AImessage(inputValue);
      const formatedMessage = convertTextToHyperlinks(rawResponse);

      clearInterval(intervalId);
      setMessages((prevMessages) => [...prevMessages.slice(0, -1), formatedMessage]);
    }
  };
  (window as any).copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Numer telefonu został skopiowany do schowka');
      })
      .catch((err) => {
        console.error('Błąd podczas kopiowania numeru telefonu do schowka: ', err);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const AImessage = async (userText: string) => {
    const data = await getAboutMe()
    const jsonData = JSON.stringify(data);

    const system =
      "Jesteś programistą Javascript , rozmówcą jest rekruter lub potencjalny pracodawca, zaprezentuj sie jak najlepiej, odpowiadaj krótko w jednym zdaniu. rekruter będzie zadawał kolejne pytania. Tutaj podaje w obiekcie wszystkie potrzebne dane:" + jsonData + "Twoja odpowiedź będzie wyświetlana w wiadomości chatu. możesz dodać formatowanie tekstu. Nie podawaj od razu wszystkich informacji i nie twórz obszernych opisów tylko tak aby zachęcić do dopytywania. Jeśli podajesz linki lub inne dane to unikaj dodawania nawiasów i innych oznaczeń to bardzo ważne";
    const chat = new OpenAiChat(system);
    const res = await chat.say(userText);
   
    
    if (conversationID === null) {
      const date = getDate();
      setConversationID(date);
      // addToConversation(date, conversationLp, userText, res);
      setConversationLp(conversationLp + 1);
    }
    if (conversationID) {
      // addToConversation(conversationID, conversationLp, userText, res);
      setConversationLp(conversationLp + 1);
    }
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
            <span dangerouslySetInnerHTML={{ __html: message }} />
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
