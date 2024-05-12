import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import CvCard from "./components/CvCard/CvCard";

const tabNames: { [key: string]: { [key: string]: string } } = {
  Polish: {
    send: 'wyślij',
    limits: 'ograniczenia',
    chat: "Otwórz czat",
    placeholder: "zadaj mi pytanie...",
    portfolio: "Portfolio",
    about: "O mnie",
    skills: "Umiejętności",
    downloadCV: "Pobierz CV",
  },
  UnitedKingdom: {
    send: 'send',
    limits: 'limits',
    chat: "Open Chat",
    placeholder: "ask me a question...",
    portfolio: "Portfolio",
    about: "About me",
    skills: "Skills",
    downloadCV: "Download CV",
  },
  Deutsch: {
    send: 'schicken',
    limits: 'Einschränkungen',
    chat: "Chat öffnen",
    placeholder: "Stellen Sie mir eine Frage...",
    portfolio: "Portfolio",
    about: "Über mich",
    skills: "Fähigkeiten",
    downloadCV: "Lebenslauf herunterladen",
  },
};

function App() {
  const [aboutMe, setAboutMe] = useState<any>();
  const [questionBot, setQuestionBot] = useState<string>();

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
    shadow: string
  ) => {
    setBackgroundOrange(backgroundOrange);
    backgroundBlue && setBackgroundBlue(backgroundBlue);
  };

  const chooseLanguage = (activeLanguage: string) => {
    setActiveLanguage(tabNames[activeLanguage]);
  };

  const askBot = (ask: string) => {
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
      />
      <Chat aboutMe={aboutMe} background={backgroundOrange} activeLanguage={activeLanguage} questionBot={questionBot}/>
    </div>
  );
}

export default App;
