import { useEffect, useState } from "react";
import "./CvCard.css";
import { LeftSite } from "./LeftSite";
import { Navbar } from "./Navbar/Navbar";
import { RightSite } from "./RightSite";
import { getImage } from "../../services/firebaseChatService";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
}
const CvCard = (props:Props) => {
  const [backgroundOrange, setBackgroundOrange] = useState<string>("linear-gradient(to right bottom, rgb(234, 226, 204), rgb(235, 208, 188))");

  const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string) => {
    props.onBackgroundChange(backgroundOrange, backgroundBlue);

    setBackgroundOrange(backgroundOrange);
};
  return (
    <div>
      <Navbar />
      <div className="Place" style={{ background: backgroundOrange }}>
        <LeftSite onBackgroundChange={handleBackgroundChange}/>
        <RightSite />
      </div>
    </div>
  );
};

export default CvCard;
