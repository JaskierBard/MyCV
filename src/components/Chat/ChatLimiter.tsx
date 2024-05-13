import { useEffect, useState } from "react";
import "./Chat.css";
import { addToConversation, sumUsedTokensFromDate } from "../../services/firebaseChatService";

export interface Props {
  userID: string;
  newMessageAwait: boolean | null;
  messages: any;
  usage: undefined | object;
  currentDate: string;
  blockInput: () => void;
  activeLanguage: {
    [key: string]: string;
  };
}

const ChatLimiter = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usedUserToken, setUsedUserToken] = useState<any>();
  const [totalTokenLimits, setTotalTokenLimits] = useState<any>();

  useEffect(() => {
    (async () => {

      if (typeof props.usage ==="object" && props.newMessageAwait !== false ) {
        const totalTokenSum = Object.values(props.usage).reduce(
          (acc, curr) => acc + curr.total_tokens,
          0
        );
        setUsedUserToken(totalTokenSum);
        setTotalTokenLimits(await sumUsedTokensFromDate(props.currentDate));
        if (props.newMessageAwait !== null ) {
          addToConversation(props.userID, props.messages, props.currentDate, totalTokenSum);
        }

      }
    })();
  }, [props.usage]);

  useEffect(() => {
    if (usedUserToken>1000 || totalTokenLimits>210000) {
      props.blockInput();
    }
  }, [usedUserToken]);

  return (
    <>
      <button
        className="chat-limiter-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.activeLanguage['limits']} {isOpen && `pozostało: ${15000 - Number(usedUserToken)} tokenów`}
      </button>
    </>
  );
};

export default ChatLimiter;
