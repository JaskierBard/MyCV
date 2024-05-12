import React, { useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";

interface Props {
  activeTab: string;
}

export const RightSite = (props: Props) => {
  const [activeButton, setActiveButton] = useState("");

  const AboutMeData = [
    { 'więcej o mnie': 'więcej o mnie' },
    { 'edukacja': 'edukacja' },
    { 'Przycisk 3': 'Przycisk 3' },
    { 'Umiejętności': 'umiejętności' }
  ];

  const PortfolioData = [
    { 'Gapp': 'Gapp' },
    { 'Gothinczuyk': 'Gothinczyk' },
    { 'HeadHunters': 'Headhunters' },
    { 'PomodoroEq': 'PomodoroEq' }
  ];

  const SkillsData = [
    { 'Frontend': 'Frontend' },
    { 'Backend': 'Backend' },
    { 'AI': 'AI' },
    { 'OtherTools': 'OtherTools' }
  ];

  const getCategoryData = (category: string) => {
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
          icon=""
        />
      ))}
    </div>
  );
};
