import { useEffect, useState } from "react";
import "./Chat.css";
import { addToConversation, getSettings, sumUsedTokensFromDate } from "../../services/firebaseChatService";

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
  const [dailyPerUser, setDailyPerUser] = useState<number>(0);
  const [dailySumUser, setDailySumUser] = useState<number>(0);

  const [usedUserToken, setUsedUserToken] = useState<any>();
  const [totalTokenLimits, setTotalTokenLimits] = useState<any>();

  useEffect(() => {
    (async () => {
      if (typeof props.usage ==="object") {
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

    if (usedUserToken>dailyPerUser || totalTokenLimits>dailySumUser) {

      props.blockInput();
    }
  }, [usedUserToken]);

  useEffect(() => {
    (async () => {

    setDailyPerUser(Number(await getSettings("dailyPerUser", "tokenLimits")))
    setDailySumUser(Number(await getSettings("dailySumUsers", "tokenLimits")))

  })();

  }, []);

  return (
    <>
      <button
        className="chat-limiter-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.activeLanguage['limits']} {isOpen && `pozostało tokenów: ${Number(dailyPerUser) - Number(usedUserToken)}`}
      </button>
    </>
  );
};

export default ChatLimiter;
