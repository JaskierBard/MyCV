import React, { useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";



export const Portfolio = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (label: string) => {
    if (activeButton === label) {
      setActiveButton(""); 
    } else {
      setActiveButton(label);
    }
  };

  return (
    <>
      <CategoryButton
        label="Gapp"
        content="ok"
        onClick={() => handleButtonClick("Więcej o mnie")}
        isContentVisible={activeButton === "Więcej o mnie"}
      />
      <CategoryButton
        label="Gothinczynk"
        content="Lorem ipsum 2..."
        onClick={() => handleButtonClick("Edukacja")}
        isContentVisible={activeButton === "Edukacja"}
      />
      <CategoryButton
        label="HeadHunters"
        content="Lorem ipsum 3..."
        onClick={() => handleButtonClick("Przycisk 3")}
        isContentVisible={activeButton === "Przycisk 3"}
      />
      <CategoryButton
        label="PomodoroEq"
        content="ok"
        onClick={() => handleButtonClick("Umiejętności")}
        isContentVisible={activeButton === "Umiejętności"}
      />
    </>
  );
};