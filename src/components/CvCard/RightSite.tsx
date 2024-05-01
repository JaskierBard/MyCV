import React, { useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";


export const RightSite = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (label: string) => {
    if (activeButton === label) {
      setActiveButton(""); // Jeśli kliknięto ponownie w aktywny przycisk, ukryj jego zawartość
    } else {
      setActiveButton(label);
    }
  };

  return (
    <div className="right">
      <CategoryButton
        label="Więcej o mnie"
        content="ok"
        onClick={() => handleButtonClick("Więcej o mnie")}
        isContentVisible={activeButton === "Więcej o mnie"}
      />
      <CategoryButton
        label="Edukacja"
        content="Lorem ipsum 2..."
        onClick={() => handleButtonClick("Edukacja")}
        isContentVisible={activeButton === "Edukacja"}
      />
      <CategoryButton
        label="Przycisk 3"
        content="Lorem ipsum 3..."
        onClick={() => handleButtonClick("Przycisk 3")}
        isContentVisible={activeButton === "Przycisk 3"}
      />
      <CategoryButton
        label="Umiejętności"
        content="ok"
        onClick={() => handleButtonClick("Umiejętności")}
        isContentVisible={activeButton === "Umiejętności"}
      />
    </div>
  );
};