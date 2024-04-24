import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { getAboutMe } from "./services/firebaseChatService";
import { getIp } from "./utils/getIp";

function App() {
  const [aboutMe, setAboutMe] = useState<any>();
  const [userIp, setUserIp] = useState<any>();



  useEffect(() => {
    (async () => {
      const data = await getAboutMe();
      setUserIp(await getIp()
    ) 
      // const jsonData = JSON.stringify(data);
      setAboutMe(data)
      
    })();
  }, []);

  return (
    <div className="App">
      <Chat aboutMe={aboutMe} userIp={userIp}/>
    </div>
  );
}

export default App;
