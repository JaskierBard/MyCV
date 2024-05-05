import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { getImage } from "../../services/firebaseChatService";
import Slider from "../Slider/Slider";

interface Props {
  onBackgroundChange: (backgroundOrange: string, backgroundBlue: string, shadow: string) => void; // Funkcja przekazująca nową wartość tła do komponentu nadrzędnego
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
      <Slider icons={icons} onBackgroundChange={handleBackgroundChange}/>
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
      <section className="text">
      </section>
      <div className="shortAboutMe">Może to nie mnie szukałeś, ale właśnie mnie znalazłeś!</div>
    </div>
  );
};
