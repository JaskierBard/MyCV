import React, { useEffect, useState } from "react";
import "./ChooseLanguage.css";

interface Props {
  icons: any;
  chooseLanguage: (language: string) => void;
}
export const ChooseLanguage = (props: Props) => {

  let languages: string[] = ["Polish", "UnitedKingdom", "Deutsch"];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    props.chooseLanguage(languages[activeIndex])
  }, [activeIndex]);

  const handleLanguageChange = () => {
    setActiveIndex(prev => (prev + 1) % languages.length);
  };

  const getClassName = (index: number) => {
    if (index === activeIndex) return 'language-icon active';
    if (index === (activeIndex + 1) % languages.length) return 'language-icon next';
    return 'language-icon';
  };
  return (
    <div className="language-switcher">
      {languages.map((language, index) => (
        <img
          key={language}
          src={props.icons && props.icons[`${language}.png`]}
          alt={language}
          className={getClassName(index)}
          onClick={handleLanguageChange}
          style={{
            // zIndex: languages.length + index, // Zapewnia odpowiednie układanie ikon
          }}
        />
      ))}
    </div>
  );
};
  

