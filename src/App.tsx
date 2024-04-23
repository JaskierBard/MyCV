import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";

function App() {
  const [aboutMe, setAboutMe] = useState<any>();


  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      // const jsonData = JSON.stringify(data);
      setAboutMe(data)
      
    })();
  }, []);

  return (
    <div className="App">
      <Chat aboutMe={aboutMe}/>
    </div>
  );
}

export default App;
