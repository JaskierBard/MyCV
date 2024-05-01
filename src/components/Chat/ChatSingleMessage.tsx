import React, { useState, useEffect } from "react";
import "./Chat.css";
import { convertTextToHyperlinks } from "../../utils/convertTextToHyperlinks";

export interface Props {
  messages: any;
  newMessageAwait: boolean | null;
}

const ChatSingleMessage = (props: Props) => {
  const [dotsCount, setDotsCount] = useState<number>(1);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (props.newMessageAwait) {
      intervalId = setInterval(() => {
        setDotsCount((prevCount) => (prevCount % 3) + 1);
      }, 700);
    }

    return () => clearInterval(intervalId);
  }, [props.newMessageAwait]);

  return (
    <>
      {props.messages.map(
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
                __html: (message.content),
              }}
            />
          </div>

        )
      )}
      {props.newMessageAwait && <div className="ai-message" style={{width:15}}><span>{".".repeat(dotsCount)}</span></div>}
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

export default ChatSingleMessage;
