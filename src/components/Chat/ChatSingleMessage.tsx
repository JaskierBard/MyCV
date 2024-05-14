import React, { useState, useEffect } from "react";
import "./Chat.css";
import { convertTextToHyperlinks } from "../../utils/convertTextToHyperlinks";

export interface Props {
  messages: any;
  newMessageAwait: boolean | null;
}

const ChatSingleMessage = (props: Props) => {
  const [dotsCount, setDotsCount] = useState<number>(1);
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  useEffect(() => {
    const images = document.querySelectorAll(".picture");
    images.forEach((image: any) => {
      image.addEventListener("click", () => handleImageClick(image.src));
    });
    return () => {
      images.forEach((image: any) => {
        image.removeEventListener("click", () => handleImageClick(image.src));
      });
    };
  }, [props.messages]);

  const handleImageClick = (imageUrl: string) => {
    console.log("Clicked image URL:", imageUrl);

    setFullscreenImg(imageUrl);
  };


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
            // style={{ width: `${getMessageWidth(message.content)}px` }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: convertTextToHyperlinks(message.content),

              }}
            />
          </div>

        )
      )}
      {props.newMessageAwait && <div className="ai-message" style={{width:15}}><span>{".".repeat(dotsCount)}</span></div>}
      {fullscreenImg && (
        <div id="fullscreen">
          <img src={fullscreenImg} alt="fullscreen_picture"></img>
          <button onClick={()=> setFullscreenImg(null)}>Zamknij</button>
        </div>
      )}
    </>
  );
};

// const getMessageWidth = (text: string) => {
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");
//   if (context) {
//     context.font = "14px Arial";
//     const width = context.measureText(text).width;
//     return width + 20;
//   }
//   return 200;
// };

export default ChatSingleMessage;
