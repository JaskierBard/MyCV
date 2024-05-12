import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { getImage } from "../../services/firebaseChatService";
import Slider from "../Slider/Slider";
import { ChooseLanguage } from "./Language/ChooseLanguage";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
  chooseLanguage: (language: string)=>void;
  icons:any;
  aboutMe: any;
}


export const LeftSite = (props:Props) => {
    const [profilePicture, setProfilePicture] = useState<any>();

    const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string, shadow: string) => {
      props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
  }
  const onClickHandle = (choice: string,) => {

    switch (choice) {
      case 'github':
        return  window.open(props.aboutMe.personalDetails[choice],'_blank')
      case 'linkedIn':
        return  window.open(props.aboutMe.personalDetails[choice],'_blank')
      case 'email':
        const composeEmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(props.aboutMe.personalDetails[choice])}`;
        return window.open(composeEmailUrl, '_blank');
      default:
        return null;
    }
}
    useEffect(() => {
        (async () => {
            const pictures = await getImage('myPhotos')
            setProfilePicture(pictures)
        })();
      }, []);

  return (
    <div className="left">
      <h1 className="name">Mateusz Świderski</h1>
      <h2 className="x">Junior web developer</h2>

      <div className="container1">
        <img
          className="photo"
          src={profilePicture &&  profilePicture['cv.png']}
          alt="CV"
        />
        <div className="ring">
          <div className="circle"></div>
        </div>
      </div>

      {/* <Icons/> */}
      
      <div className="shortAboutMe">
        <div>Jestem otwarty na oferty pracy</div>
      <img src={props.icons && props.icons['github-color.png']} className="links-icon" onClick={() =>onClickHandle('github')}></img>
      <img src={props.icons && props.icons['linkedin-color.png']} className="links-icon" onClick={() =>onClickHandle('linkedIn')}></img>
      <img src={props.icons && props.icons['gmail-color.png']} className="links-icon" onClick={() =>onClickHandle('email')}></img>

      </div>


      <Slider icons={props.icons} onBackgroundChange={handleBackgroundChange}/>
      <ChooseLanguage icons={props.icons} chooseLanguage={props.chooseLanguage}/>


    </div>
  );
};
