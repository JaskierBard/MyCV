import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import CvCard from "./components/CvCard/CvCard";

function App() {
  const [aboutMe, setAboutMe] = useState<any>();

  const [backgroundOrange, setBackgroundOrange] = useState<string>("linear-gradient(to bottom right, #ear2cc, #ebd0bc)");
  const [backgroundBlue, setBackgroundBlue] = useState<string>("linear-gradient(to bottom right, #93c3c3, #6a94ad)");

  const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string, shadow: string) => {
    setBackgroundOrange(backgroundOrange);
    backgroundBlue && setBackgroundBlue(backgroundBlue)
  };

  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      setAboutMe(data);
    })();
  }, []);

  useEffect(() => {
    // Ustaw tło dla całego body na tło z backgroundBlue
    document.body.style.background = backgroundBlue;
  }, [backgroundBlue]);

  return (
    <div>
      <CvCard onBackgroundChange={handleBackgroundChange}/>
      <Chat aboutMe={aboutMe} background={backgroundOrange}/>
    </div>
  );
}

export default App;
