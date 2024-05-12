import React, { useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";

interface Props {
  activeTab: string;
  icons: { [key: string]: string };
  aboutMe: any;
}

interface CategoryItem {
  [key: string]: [string] | string;
}

export const RightSite = (props: Props) => {
  const [activeButton, setActiveButton] = useState("");
// console.log(props.aboutMe)
  const AboutMeData: CategoryItem[] = [
    { 'about-me': 'więcej o mnie' },
    { 'skills': 'edukacja' },
    { 'education': 'Przycisk 3' },
    { 'interests': 'umiejętności' }
  ];

  const PortfolioData: CategoryItem[] = [
    { 'Gapp': props.aboutMe?.projects.Gapp.description || '' },
    { 'Gothinczyk': props.aboutMe?.projects.Gothińczyk.description || '' },
    { 'HeadHunter': props.aboutMe?.projects.HeadHunter.description || ''},
    { 'PomodoroEq': props.aboutMe?.projects.PomodoroEq.description || ''}
  ];

  const SkillsData: CategoryItem[] = [
    { 'frontend': props.aboutMe?.skills.frontend || [] },
    { 'backend': props.aboutMe?.skills.backend || [] },
    { 'ai': props.aboutMe?.skills?.AI || [] },
    { 'tools': props.aboutMe?.skills?.otherTools || [] }
  ];

  const Welcome: CategoryItem[] = [
    { 'Witaj!': ' Witaj na moim CV. Znajdziesz tutaj trochę informacji o mnie w poszczególnych zakładkach lub po prostu zapytaj o to mojego bota'},
    
  ];
  

  const getCategoryData = (category: string): CategoryItem[] => {
    switch (category) {
      case 'AboutMe':
        return AboutMeData;
      case 'Portfolio':
        return PortfolioData;
      case 'Skills':
        return SkillsData;
      default:
        return Welcome;
    }
  };

  const handleButtonClick = (label: string) => {
    setActiveButton(activeButton === label ? "" : label);
  };

  const categoryData = getCategoryData(props.activeTab);

  return (
    <div className="right">
      {categoryData.map((item, index) => (
        <CategoryButton
          key={index}
          label={Object.keys(item)[0]}
          content={Object.values(item)[0]}
          onClick={() => handleButtonClick(Object.keys(item)[0])}
          isContentVisible={activeButton === Object.keys(item)[0]}
          icon={props.icons && props.icons[`${Object.keys(item)[0]}.png`]}
        />
      ))}
    </div>
  );
};
