import { useEffect, useState } from "react";
import "./CvCard.css";
import { LeftSite } from "./LeftSite";
import { Navbar } from "./Navbar/Navbar";
import { RightSite } from "./RightSite";
import { getImage } from "../../services/firebaseChatService";
import { ChooseLanguage } from "./Language/ChooseLanguage";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void;
  chooseLanguage: (language: string)=>void;
  activeLanguage: {
    [key: string]: string;
  };
  aboutMe:any;
  askBot: (ask: string)=>void;

}
const CvCard = (props:Props) => {
  const [backgroundOrange, setBackgroundOrange] = useState<string>("linear-gradient(to right bottom, rgb(234, 226, 204), rgb(235, 208, 188))");
  const [shadow, setShadow] = useState<string>("15px 15px 10px rgba(0, 0, 0, 0.5)");
  const [activeTab, setActiveTab] = useState<string>("");
  const [icons, setIcons] = useState<any>();



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
    <div>
      <Navbar handleActiveTabChange={handleActiveTabChange} activeLanguage={props.activeLanguage}/>
      <div className="cv-board" style={{ background: backgroundOrange, boxShadow: shadow }}>
        <LeftSite onBackgroundChange={handleBackgroundChange} chooseLanguage={props.chooseLanguage} icons={icons} aboutMe={props.aboutMe}/>
        <RightSite activeTab={activeTab} aboutMe={props.aboutMe} icons={icons} askBot={props.askBot} activeLanguage={props.activeLanguage}/>
      </div>
    </div>
  );
};

export default CvCard;
