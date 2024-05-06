import React, { useState } from "react";
import "./Navbar.css";

interface Props {
  handleActiveTabChange: (tab: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
  activeLanguage: {
    [key: string]: string;
  };
}

export const Navbar = (props: Props) => {
  const [activeTab, setActiveTab] = useState("CV"); // Dodajemy stan śledzący aktywny element

  const handleTabClick = (tab: string) => {
    props.handleActiveTabChange(tab);
    setActiveTab(tab); // Ustawiamy aktywny element na kliknięty
  };

  return (
    <div className="Nav">
      <h1 onClick={() => handleTabClick("CV")}>CV</h1>
      <h2
        onClick={() => handleTabClick("O mnie")}
        className={activeTab === "O mnie" ? "active" : ""}
      >
        {props.activeLanguage['about']}
      </h2>
      <h2
        onClick={() => handleTabClick("Portfolio")}
        className={activeTab === "Portfolio" ? "active" : ""}
      >
        {props.activeLanguage['portfolio']}
      </h2>
      <h2
        onClick={() => handleTabClick("Umiejętności")}
        className={activeTab === "Umiejętności" ? "active" : ""}
      >
        {props.activeLanguage['skills']}
      </h2>
      <button className="button">{props.activeLanguage['downloadCV']}</button>
    </div>
  );
};
