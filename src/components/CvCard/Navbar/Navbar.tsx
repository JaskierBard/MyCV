import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { downloadCV } from "../../../services/firebaseChatService";

interface Props {
  handleActiveTabChange: (tab: string) => void;
  activeLanguage: {
    [key: string]: string;
  };
}

export const Navbar = (props: Props) => {
  const [activeTab, setActiveTab] = useState("CV"); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleTabClick = (tab: string) => {
    props.handleActiveTabChange(tab);
    setActiveTab(tab); 
    setIsMenuOpen(false); 
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth >= 1000 ? (
        <div className="regular-nav">
          <h1 onClick={() => handleTabClick("CV")}>CV</h1>
          <h2
            onClick={() => handleTabClick("AboutMe")}
            className={activeTab === "AboutMe" ? "active" : ""}
          >
            {props.activeLanguage["about"]}
          </h2>
          <h2
            onClick={() => handleTabClick("Portfolio")}
            className={activeTab === "Portfolio" ? "active" : ""}
          >
            {props.activeLanguage["portfolio"]}
          </h2>
          <h2
            onClick={() => handleTabClick("Skills")}
            className={activeTab === "Skills" ? "active" : ""}
          >
            {props.activeLanguage["skills"]}
          </h2>
          <button className="button" onClick={downloadCV}>
            {props.activeLanguage["downloadCV"]}
          </button>
        </div>
      ) : (
        <div className="main-nav">
          <div className="hamburger-nav">
            <h1>CV</h1>
            <button onClick={handleMenuToggle} className="hamburger-button">
              {!isMenuOpen ? "☰" : "X"}
            </button>
          </div>
          {isMenuOpen && (
            <div className="nav-list">
              <h2
                onClick={() => handleTabClick("AboutMe")}
                className={activeTab === "AboutMe" ? "active" : ""}
              >
                {props.activeLanguage["about"]}
              </h2>
              <h2
                onClick={() => handleTabClick("Portfolio")}
                className={activeTab === "Portfolio" ? "active" : ""}
              >
                {props.activeLanguage["portfolio"]}
              </h2>
              <h2
                onClick={() => handleTabClick("Skills")}
                className={activeTab === "Skills" ? "active" : ""}
              >
                {props.activeLanguage["skills"]}
              </h2>
              <button  onClick={downloadCV} className="button">
                {props.activeLanguage["downloadCV"]}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
