import { useEffect, useState } from "react";
import "./CvCard.css";
import { LeftSite } from "./LeftSite";
import { Navbar } from "./Navbar/Navbar";
import { RightSite } from "./RightSite";
import { getImage } from "../../services/firebaseChatService";
import { ChooseLanguage } from "./Language/ChooseLanguage";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void;
}
const CvCard = (props:Props) => {
  const [backgroundOrange, setBackgroundOrange] = useState<string>("linear-gradient(to right bottom, rgb(234, 226, 204), rgb(235, 208, 188))");
  const [shadow, setShadow] = useState<string>("15px 15px 10px rgba(0, 0, 0, 0.5)");
  const [activeTab, setActiveTab] = useState<string>("");


  const handleActiveTabChange = (activeTab: string) => {
    setActiveTab(activeTab)
};

  const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string, shadow: string) => {
    props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
    setShadow(shadow)
    setBackgroundOrange(backgroundOrange);
};
  return (
    <div>
      <Navbar handleActiveTabChange={handleActiveTabChange}/>
      <div className="Place" style={{ background: backgroundOrange, boxShadow: shadow }}>
        <LeftSite onBackgroundChange={handleBackgroundChange}/>
        <RightSite activeTab={activeTab}/>
      </div>
    </div>
  );
};

export default CvCard;
