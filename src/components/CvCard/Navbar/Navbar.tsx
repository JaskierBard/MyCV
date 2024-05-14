import React, { useEffect, useState } from "react";
import "./Navbar.css";

interface Props {
  handleActiveTabChange: (tab: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
  activeLanguage: {
    [key: string]: string;
  };
}

export const Navbar = (props: Props) => {
  const [activeTab, setActiveTab] = useState("CV"); // Dodajemy stan śledzący aktywny element
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dodajemy stan do śledzenia otwarcia/zamknięcia menu bocznego

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleTabClick = (tab: string) => {
    props.handleActiveTabChange(tab);
    setActiveTab(tab); // Ustawiamy aktywny element na kliknięty
    setIsMenuOpen(false); // Po kliknięciu na element menu zamykamy menu boczne
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Funkcja do otwierania/zamykania menu bocznego
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
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
          <button className="button">
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
              <button className="button">
                {props.activeLanguage["downloadCV"]}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
