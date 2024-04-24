import { useEffect, useState } from "react";
import "./Chat.css";

export interface Props {
  chat: any;
  usage: undefined | object;
  getUsedTokens: (variable:string) => void
}

const ChatLimiter = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    if (props.usage) {
      const totalTokenSum = Object.values(props.usage).reduce((acc, curr) => acc + curr.total_tokens, 0);
      setSum(totalTokenSum);
      console.log(totalTokenSum)
      if (totalTokenSum > 0) {
              props.getUsedTokens(totalTokenSum)
      }

    }

  }, [props.usage]);



  return (
    <>
      <button
        className="chat-limiter-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        limits {isOpen && `pozostało: ${15000 - sum} tokenów`}
      </button>
    </>
  );
};

export default ChatLimiter;
