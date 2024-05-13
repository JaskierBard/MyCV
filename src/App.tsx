import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import CvCard from "./components/CvCard/CvCard";

const tabNames: { [key: string]: { [key: string]: string } } = {
  Polish: {
    send: 'wyślij',
    tokenWarning: ' Przekroczono dzienny limit tokenów',
    limits: 'ograniczenia',
    chat: "Otwórz czat",
    placeholder: "zadaj mi pytanie...",
    portfolio: "Portfolio",
    about: "O mnie",
    skills: "Umiejętności",
    downloadCV: "Pobierz CV",
    answer: "Zmień język rozmowy na Polski. Opowiedz mi więcej o: ",
    interests: "zainteresowania",
    ai: "sztuczna inteligencja",
    tools: "pozostałe narzędzia",
    education: "edukacja",
    frontend: "frontend",
    backend: "backend",


  },
  UnitedKingdom: {
    send: 'send',
    tokenWarning: 'Daily token limit exceeded',
    limits: 'limits',
    chat: "Open Chat",
    placeholder: "ask me a question...",
    portfolio: "Portfolio",
    about: "About me",
    skills: "skills",
    downloadCV: "Download CV",
    answer: "Zmień język rozmowy na angielski. Tell me more about:  ",
    interests: "intersts",
    ai: "artificial intelligence",
    tools: "other tools",
    education: "education",
    frontend: "frontend",
    backend: "backend",




  },
  Deutsch: {
    send: 'schicken',
    tokenWarning: 'Das tägliche Token-Limit wurde überschritten',
    limits: 'Einschränkungen',
    chat: "Chat öffnen",
    placeholder: "Stellen Sie mir eine Frage...",
    portfolio: "Portfolio",
    about: "Über mich",
    skills: "Fähigkeiten",
    downloadCV: "Lebenslauf herunterladen",
    answer: "Zmień język rozmowy na niemiecki to ważne. Nie pros o zmianę języka i odpowiadaj po Niemiecku jak najlepiej umiesz. Erzähl mir mehr von:  ",
    interests: "Interessen",
    ai: "künstliche Intelligenz",
    tools: "andere Werkzeuge",
    education: "Ausbildung",
    frontend: "frontend",
    backend: "backend",



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
