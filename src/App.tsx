import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import CvCard from "./components/CvCard/CvCard";

function App() {
  const [aboutMe, setAboutMe] = useState<any>();

  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      setAboutMe(data);
    })();
  }, []);

  return (
    <div className="App">
      <CvCard/>
      <Chat aboutMe={aboutMe} />
    </div>
  );
}

export default App;
