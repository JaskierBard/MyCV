import React, { useState } from "react";
import "./Slider.css";

interface Props {
  icons: any;
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow:string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
}

const Slider = (props: Props) => {
  const [brightness, setBrightness] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrightness = parseInt(event.target.value, 10);

    const newColor1 = `rgb(${234 + newBrightness * 0.3}, ${
      226 + newBrightness * 0.3
    }, ${204 + newBrightness * 0.3})`;
    const newColor2 = `rgb(${235 + newBrightness * 0.3}, ${
      208 + newBrightness * 0.3
    }, ${188 + newBrightness * 0.3})`;

    const newColorBlue1 = `rgb(${147 + newBrightness * 0.3}, ${
        195 + newBrightness * 0.3
      }, ${195 + newBrightness * 0.3})`;
      const newColorBlue2 = `rgb(${106 + newBrightness * 0.3}, ${
        148 + newBrightness * 0.3
      }, ${173 + newBrightness * 0.3})`;

    const backgroundOrange = `linear-gradient(to bottom right, ${newColor1}, ${newColor2})`;
    const backgroundBlue = `linear-gradient(to bottom right, ${newColorBlue1}, ${newColorBlue2})`;

    const OffsetX = 15;
    const OffsetY = 15;
    const BlurRadius = 10;
      
    const shadow = `${OffsetX + newBrightness * 0.3}px ${OffsetY + newBrightness * 0.3}px ${BlurRadius + newBrightness * 0.3}px rgba(0, 0, 0, 0.5)`

    setBrightness(newBrightness);
    props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
  };

  return (
    <div className="container">
      <img
        className="sun"
        src={props.icons && props.icons["sun.png"]}
        alt="sun"
      />
      <input
        type="range"
        min="0"
        max="100"
        value={brightness}
        className="slider"
        id="myRange"
        onChange={handleChange}
      />
      <img
        className="moon"
        src={props.icons && props.icons["moon.png"]}
        alt="moon"
      />
    </div>
  );
};

export default Slider;
