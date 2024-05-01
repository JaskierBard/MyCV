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
}

const ChatLimiter = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usedUserToken, setUsedUserToken] = useState<any>();
  const [totalTokenLimits, setTotalTokenLimits] = useState<any>();

  useEffect(() => {
    (async () => {
      if (props.usage && props.newMessageAwait === false) {
        const totalTokenSum = Object.values(props.usage).reduce(
          (acc, curr) => acc + curr.total_tokens,
          0
        );
        setUsedUserToken(totalTokenSum);
        setTotalTokenLimits(await sumUsedTokensFromDate(props.currentDate));
        addToConversation(props.userID, props.messages, props.currentDate, totalTokenSum);

      }
    })();

  }, [props.usage]);

  useEffect(() => {
    if (usedUserToken>11000 || totalTokenLimits>20000) {
      props.blockInput();
    }
  }, [usedUserToken]);

  return (
    <>
      <button
        className="chat-limiter-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        limits {isOpen && `pozostało: ${15000 - usedUserToken} tokenów`}
      </button>
    </>
  );
};

export default ChatLimiter;
