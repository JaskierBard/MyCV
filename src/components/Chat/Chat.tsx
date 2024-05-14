import { useEffect, useState } from "react";
import "./Chat.css";
import ChatMessages from "./ChatMessages";

export interface Props {
  aboutMe: any;
  background: string;
  activeLanguage: {
    [key: string]: string;
  };
  questionBot:string | undefined;
  blockQuestionBot: () => void;

}

const Chat = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tryToClose, setTryToClose] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (props.questionBot !== undefined) {
      if (isOpen === false) {
        setIsOpen(true)
      }
    }
  }, [props.questionBot]);

  const toggleChat = () => {
    if (isOpen && tryToClose === false) {
      setTryToClose(true);
    } else {
      setIsOpen(!isOpen);
      setTryToClose(false);
    }
  };

  const toFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {!isOpen && (
        <button className="open-button" onClick={toggleChat}>
          {props.activeLanguage['chat']}
        </button>
      )}
      {isOpen && (
        <div
          className={` ${
            isFullscreen ? "fullscreen-chat-container" : "chat-container"
          }`}
        >
          <nav className="nav">
            <div className="bot-name">MateuszBot</div>
            <div>
              <button className="fullscreen-button" onClick={toFullscreen}>
                [ ]
              </button>
              <button className="close-button" onClick={toggleChat}>
                X
              </button>
            </div>
          </nav>
          <ChatMessages
            feedback={tryToClose}
            aboutMe={props.aboutMe}
            background={props.background}
            activeLanguage={props.activeLanguage}
            questionBot= {props.questionBot}
            blockQuestionBot={props.blockQuestionBot}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
