import  {useState}  from "react";
import "./CvCard.css";
import { CategoryButton } from "./common/CategoryButton/CategoryButton";

interface Props {
  activeTab: string;
  icons: { [key: string]: string };
  aboutMe: any;
  shortInfos: any;
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

  const AboutMeData: CategoryItem[] = [
    { 'moreAbout': props.shortInfos?.aboutMe[props.activeLanguage['language']] },
    { 'courses': props.shortInfos?.courses[props.activeLanguage['language']]},
    { 'education': props.shortInfos?.education[props.activeLanguage['language']]},
    { 'interests': props.shortInfos?.interests[props.activeLanguage['language']] }
  ];

  const PortfolioData: CategoryItem[] = [
    { 'Gapp': props.shortInfos?.Gapp[props.activeLanguage['language']]},
    { 'Gothinczyk': props.shortInfos?.Gothinczyk[props.activeLanguage['language']]},
    { 'HeadHunter': props.shortInfos?.HeadHunter[props.activeLanguage['language']]},
    { 'PomodoroEq': props.shortInfos?.PomodoroEq[props.activeLanguage['language']]}
  ];

  const SkillsData: CategoryItem[] = [
    { 'frontend': props.aboutMe?.skills.frontend || [] },
    { 'backend': props.aboutMe?.skills.backend || [] },
    { 'ai': props.aboutMe?.skills?.AI || [] },
    { 'tools': props.aboutMe?.skills?.otherTools || [] }
  ];

  const Welcome: CategoryItem[] = [
    { 'welcome': props.activeLanguage['welcomeSpeech']},
    
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
