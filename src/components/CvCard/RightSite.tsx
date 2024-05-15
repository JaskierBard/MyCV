import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";
import { getShort } from "../../services/firebaseChatService";

interface Props {
  activeTab: string;
  icons: { [key: string]: string };
  aboutMe: any;
  askBot: (ask: string)=>void;
  activeLanguage: {
    [key: string]: string;
  };
  blockQuestionBot:boolean

}

interface CategoryItem {
  [key: string]: [string] | string;
}

export const RightSite = (props: Props) => {
  const [activeButton, setActiveButton] = useState("");
  const [shortInfos, setShortInfos] = useState<any>();

  useEffect(() => {
    (async () => {
      const info = await getShort();
      console.log(props.activeLanguage);
      setShortInfos(info);
    })();
  }, []);

  const AboutMeData: CategoryItem[] = [
    { 'moreAbout': shortInfos?.aboutMe[props.activeLanguage['language']] },
    { 'courses': shortInfos?.courses[props.activeLanguage['language']]},
    { 'education': shortInfos?.education[props.activeLanguage['language']]},
    { 'interests': shortInfos?.interests[props.activeLanguage['language']] }
  ];

  const PortfolioData: CategoryItem[] = [
    { 'Gapp': shortInfos?.Gapp[props.activeLanguage['language']]},
    { 'Gothinczyk': shortInfos?.Gothinczyk[props.activeLanguage['language']]},
    { 'HeadHunter': shortInfos?.HeadHunter[props.activeLanguage['language']]},
    { 'PomodoroEq': shortInfos?.PomodoroEq[props.activeLanguage['language']]}
  ];

  const SkillsData: CategoryItem[] = [
    { 'frontend': props.aboutMe?.skills.frontend || [] },
    { 'backend': props.aboutMe?.skills.backend || [] },
    { 'ai': props.aboutMe?.skills?.AI || [] },
    { 'tools': props.aboutMe?.skills?.otherTools || [] }
  ];

  const Welcome: CategoryItem[] = [
    { 'welcome': ' Witaj na moim CV. Znajdziesz tutaj trochę informacji o mnie w poszczególnych zakładkach lub po prostu zapytaj o to mojego bota'},
    
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
          label={props.activeTab === 'Portfolio' ? Object.keys(item)[0] :props.activeLanguage[`${Object.keys(item)[0]}`]}
          content={Object.values(item)[0]}
          onClick={() => handleButtonClick(Object.keys(item)[0])}
          isContentVisible={activeButton === Object.keys(item)[0]}
          icon={props.icons && props.icons[`${Object.keys(item)[0]}.png`]}
          botIcon={props.icons && props.icons[`ask-bot.png`]}
          askBot={props.askBot}
          activeLanguage= {props.activeLanguage}
          blockQuestionBot= {props.blockQuestionBot}

        />
      ))}
    </div>
  );
};
