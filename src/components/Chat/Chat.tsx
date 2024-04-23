import { useState } from "react";
import "./Chat.css";
import ChatMessages from "./ChatMessages";

export interface Props {
  aboutMe: any;
}

const Chat = (props:Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tryToClose, setTryToClose] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleChat = () => {
    if (isOpen && tryToClose === false) {
      setTryToClose(true)
    } else {
      setIsOpen(!isOpen);
      setTryToClose(false)
    }
  };

  const toFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };



  return (
    <>
      {!isOpen && (
        <button className="open-button" onClick={toggleChat}>
          Otwórz czat
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
          <ChatMessages feedback={tryToClose} aboutMe={props.aboutMe}/>
        </div>
      )}
    </>
  );
};


export default Chat;
