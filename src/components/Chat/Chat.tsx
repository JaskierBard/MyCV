import { useState } from "react";
import "./Chat.css";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };



  return (
    <>
      {!isOpen && (
        <button className="open-button" onClick={toggleChat}>
          Open chat
        </button>
      )}
      {isOpen && (
        <div
          className={` ${
            isFullscreen ? "fullscreen-chat-container" : "chat-container"
          }`}
        >
            <nav className="nav">
          <div className="name">MateuszBot</div>
          <div><button className="fullscreen-button" onClick={toFullscreen}>
            [ ]
          </button>
          <button className="close-button" onClick={toggleChat}>
            X
          </button></div>
          
          </nav>
          <ChatMessages/>
        </div>
      )}
    </>
  );
};


export default Chat;
