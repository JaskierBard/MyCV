import { useEffect, useState } from "react";
import "./Chat.css";

export interface Props {
  messages: any;
}

const ChatSingleMessage = (props: Props) => {
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
                __html: message.content,
              }}
            />
          </div>
        )
      )}
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
