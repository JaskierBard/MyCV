import React, { useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";

interface Props {
  activeTab: string;
  icons: { [key: string]: string };
}

interface CategoryItem {
  [key: string]: string;
}

export const RightSite = (props: Props) => {
  const [activeButton, setActiveButton] = useState("");

  const AboutMeData: CategoryItem[] = [
    { 'about-me': 'więcej o mnie' },
    { 'skills': 'edukacja' },
    { 'education': 'Przycisk 3' },
    { 'interests': 'umiejętności' }
  ];

  const PortfolioData: CategoryItem[] = [
    { 'Gapp': 'Gapp' },
    { 'Gothinczuyk': 'Gothinczyk' },
    { 'HeadHunters': 'Headhunters' },
    { 'PomodoroEq': 'PomodoroEq' }
  ];

  const SkillsData: CategoryItem[] = [
    { 'frontend': 'Frontend' },
    { 'backend': 'Backend' },
    { 'ai': 'AI' },
    { 'tools': 'OtherTools' }
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
        return [];
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
