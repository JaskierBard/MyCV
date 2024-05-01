import React, { useEffect, useState } from "react";
import "./CvCard.css";
import { getImage } from "../../services/firebaseChatService";



export const LeftSite = () => {
    const [profilePicture, setProfilePicture] = useState<any>();

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
      <section className="text">
      </section>
      <div className="shortAboutMe">Może to nie mnie szukałeś, ale właśnie mnie znalazłeś!</div>
    </div>
  );
};
