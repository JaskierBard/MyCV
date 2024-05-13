import React, { useEffect, useState } from "react";

const FullscreenImg: React.FC = () => {
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  useEffect(() => {
    const images = document.querySelectorAll(".picture");
    images.forEach((image: any) => {
      image.addEventListener("click", () => handleImageClick(image.src));
    });
    return () => {
      images.forEach((image: any) => {
        image.removeEventListener("click", () => handleImageClick(image.src));
      });
    };
  }, []);

  const handleImageClick = (imageUrl: string) => {
    console.log("Clicked image URL:", imageUrl);

    setFullscreenImg(imageUrl);
  };
  return (
    <>
      {fullscreenImg && (
        <div id="fullscreen">
          <img src={fullscreenImg}></img>
          <button onClick={()=> setFullscreenImg(null)}>Zamknij</button>
        </div>
      )}
    </>
  );
};

export default FullscreenImg;
