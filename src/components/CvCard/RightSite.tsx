import React from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";
import { AboutMe } from "./AboutMe";
import { Skills } from "./Skills";
import { Portfolio } from "./Portfolio";

interface Props {
  activeTab: string;
}

export const RightSite: React.FC<Props> = ({ activeTab }) => {


  return (
    <div className="right">
      {activeTab === "CV" && <button className="button">Pobierz CV</button>}
      {activeTab === "O mnie" && <AboutMe />}
      {activeTab === "Portfolio" && <Portfolio/>}
      {activeTab === "Umiejętności" && <Skills/>}
    </div>
  );
};
