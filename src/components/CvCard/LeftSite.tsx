import React from "react";
import "./CvCard.css";



export const LeftSite = () => {


  return (
    <div className="left">
      <h1 className="name">Mateusz Świderski</h1>
      <h2 className="x">Junior web developer</h2>

      <div className="container1">
        <img
          className="photo"
          src={process.env.PUBLIC_URL + "/images/cv.png"}
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
