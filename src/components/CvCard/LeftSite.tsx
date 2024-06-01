import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { getImage } from "../../services/firebaseChatService";
import Slider from "../Slider/Slider";
import { ChooseLanguage } from "./Language/ChooseLanguage";

interface Props {
  onBackgroundChange: (
    backgroundOrange: string,
    backgroundBlue: string,
    shadow: string
  ) => void; 
  chooseLanguage: (language: string) => void;
  icons: any;
  aboutMe: any;
  shortInfos: any,
  activeLanguage: {
    [key: string]: string;
  };
}

export const LeftSite = (props: Props) => {
  const [profilePicture, setProfilePicture] = useState<any>();

  const handleBackgroundChange = (
    backgroundOrange: string,
    backgroundBlue: string,
    shadow: string
  ) => {
    props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
  };
  const onClickHandle = (choice: string) => {
    switch (choice) {
      case "github":
        console.log(props.aboutMe.personalDetails[choice]);

        return window.open(props.aboutMe.personalDetails[choice], "_blank");
      case "linkedIn":
        console.log(props.aboutMe.personalDetails[choice]);
        return window.open(props.aboutMe.personalDetails[choice], "_blank");
      case "email":
        const composeEmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          props.aboutMe.personalDetails[choice]
        )}`;
        return window.open(composeEmailUrl, "_blank");
      default:
        return null;
    }
  };
  useEffect(() => {
    (async () => {
      const pictures = await getImage("myPhotos");
      setProfilePicture(pictures);
    })();
  }, []);

  return (
    <div className="left">
      <h1 className="name">Mateusz Świderski</h1>
      <h2 className="x">Junior web developer</h2>

      <div className="container1">
        <img
          className="photo"
          src={profilePicture && profilePicture["cv.png"]}
          alt="CV"
        />
        <div className="ring">
          <div className="circle"></div>
        </div>
      </div>

      <div className="shortAboutMe">
        <div>{props.shortInfos?.work[props.activeLanguage['language']]}</div>
        <div className="clickbait">{props.activeLanguage["tip"]}</div>

        <img
          src={props.icons && props.icons["github-color.png"]}
          className="links-icon"
          onClick={() => onClickHandle("github")}
          alt="github"
        ></img>
        <img
          src={props.icons && props.icons["linkedin-color.png"]}
          className="links-icon"
          onClick={() => onClickHandle("linkedIn")}
          alt="linkedIn"

        ></img>
        <img
          src={props.icons && props.icons["gmail-color.png"]}
          className="links-icon"
          onClick={() => onClickHandle("email")}
          alt="email"

        ></img>
        <ChooseLanguage
        icons={props.icons}
        chooseLanguage={props.chooseLanguage}
      />
      </div>

      <Slider icons={props.icons} onBackgroundChange={handleBackgroundChange} />
      

      <div className="law">{props.activeLanguage["law"]}</div>
    </div>
  );
};
