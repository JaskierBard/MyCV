import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { getImage } from "../../services/firebaseChatService";
import Slider from "../Slider/Slider";
import { ChooseLanguage } from "./Language/ChooseLanguage";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
  chooseLanguage: (language: string)=>void;
}


export const LeftSite = (props:Props) => {
    const [profilePicture, setProfilePicture] = useState<any>();
    const [icons, setIcons] = useState<any>();

    const handleBackgroundChange = (backgroundOrange: string, backgroundBlue:string, shadow: string) => {
      props.onBackgroundChange(backgroundOrange, backgroundBlue, shadow);
  }
    useEffect(() => {
        (async () => {
            const pictures = await getImage('myPhotos')
            const iconsURLs = await getImage('icons')
            setProfilePicture(pictures)
            setIcons(iconsURLs)
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
      
      <div className="shortAboutMe">status: Poszukujący pracy</div>


      <Slider icons={icons} onBackgroundChange={handleBackgroundChange}/>
      <ChooseLanguage icons={icons} chooseLanguage={props.chooseLanguage}/>


    </div>
  );
};
