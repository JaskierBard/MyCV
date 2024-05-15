import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import CvCard from "./components/CvCard/CvCard";
import { tabNames } from "./utils/translations";



function App() {
  const [aboutMe, setAboutMe] = useState<any>();
  const [questionBot, setQuestionBot] = useState<string | null>(null);
  const [blockQuestionBot, setBlockQuestionBot] = useState<boolean>(false);

  const [activeLanguage, setActiveLanguage] = useState<{
    [key: string]: string;
  }>(tabNames['Polish']);

  const [backgroundOrange, setBackgroundOrange] = useState<string>(
    "linear-gradient(to bottom right, #ear2cc, #ebd0bc)"
  );
  const [backgroundBlue, setBackgroundBlue] = useState<string>(
    "linear-gradient(to bottom right, #93c3c3, #6a94ad)"
  );

  const handleBackgroundChange = (
    backgroundOrange: string,
    backgroundBlue: string,
  ) => {
    setBackgroundOrange(backgroundOrange);
    backgroundBlue && setBackgroundBlue(backgroundBlue);
  };

  const chooseLanguage = (activeLanguage: string) => {
    setActiveLanguage(tabNames[activeLanguage]);
  };

  const handleBlockQuestionBot = () => {
    setBlockQuestionBot(true);
  };

  const askBot = (ask: string | null) => {
    setQuestionBot(ask);
  };

  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      setAboutMe(data);
    })();
  }, []);

  useEffect(() => {
    document.body.style.background = backgroundBlue;
  }, [backgroundBlue]);

  return (
    <div>
      <CvCard
        onBackgroundChange={handleBackgroundChange}
        chooseLanguage={chooseLanguage}
        activeLanguage={activeLanguage}
        aboutMe={aboutMe}
        askBot={askBot}
        blockQuestionBot={blockQuestionBot}
      />
      <Chat aboutMe={aboutMe} background={backgroundOrange} activeLanguage={activeLanguage} questionBot={questionBot}  blockQuestionBot={handleBlockQuestionBot} askBot={askBot}/>
    </div>
  );
}

export default App;
