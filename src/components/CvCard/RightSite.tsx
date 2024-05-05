import React from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";
import { AboutMe } from "./AboutMe";

interface Props {
  activeTab: string;
}

export const RightSite: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className="right">
      {activeTab === "CV" && <button className="button">Pobierz CV</button>}
      {activeTab === "O mnie" && <AboutMe />}
      {activeTab === "Portfolio" && <div>Portfolio</div>}
      {activeTab === "Umiejętności" && <div>Umiejętności</div>}
    </div>
  );
};
