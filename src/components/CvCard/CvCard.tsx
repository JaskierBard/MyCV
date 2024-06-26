import { useEffect, useState } from "react";
import "./CvCard.css";
import { LeftSite } from "./LeftSite";
import { Navbar } from "./Navbar/Navbar";
import { RightSite } from "./RightSite";
import { getImage, getShort } from "../../services/firebaseChatService";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void;
  chooseLanguage: (language: string)=>void;
  activeLanguage: {
    [key: string]: string;
  };
  aboutMe:any;
  askBot: (ask: string)=>void;
  blockQuestionBot:boolean

}
const CvCard = (props:Props) => {
  const [backgroundOrange, setBackgroundOrange] = useState<string>("linear-gradient(to right bottom, rgb(234, 226, 204), rgb(235, 208, 188))");
  const [shadow, setShadow] = useState<string>("15px 15px 10px rgba(0, 0, 0, 0.5)");
  const [activeTab, setActiveTab] = useState<string>("");
  const [icons, setIcons] = useState<any>();
  const [shortInfos, setShortInfos] = useState<any>();

  useEffect(() => {
    (async () => {
      const info = await getShort();
      setShortInfos(info);
    })();
  }, []);



  const handleActiveTabChange = (activeTab: string) => {
    setActiveTab(activeTab)
};


useEffect(() => {
  (async () => {
      const iconsURLs = await getImage('icons')
      setIcons(iconsURLs)
  })();
}, []);


  const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string, shadow: string) => {
    props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
    setShadow(shadow)
    setBackgroundOrange(backgroundOrange); 
};
  return (
    <div className="motherboard">
      <Navbar handleActiveTabChange={handleActiveTabChange} activeLanguage={props.activeLanguage}/>
      <div className="cv-board" style={{ background: backgroundOrange, boxShadow: shadow }}>
        <LeftSite onBackgroundChange={handleBackgroundChange} chooseLanguage={props.chooseLanguage} activeLanguage={props.activeLanguage} icons={icons} aboutMe={props.aboutMe} shortInfos={shortInfos}/>
        <RightSite activeTab={activeTab} aboutMe={props.aboutMe} icons={icons} askBot={props.askBot} activeLanguage={props.activeLanguage} blockQuestionBot={props.blockQuestionBot} shortInfos={shortInfos}/>
      </div>
    </div>
  );
};

export default CvCard;
