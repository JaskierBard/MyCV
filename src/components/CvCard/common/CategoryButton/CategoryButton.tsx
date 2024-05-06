import React, { useState } from "react";
import "./CategoryButton.css";

type Props = {
    label: string;
    content: string;
    onClick: () => void; // dodajemy props onClick
    isContentVisible: boolean; // dodajemy props isContentVisible
};

export const CategoryButton: React.FC<Props>= ({ label, content, onClick, isContentVisible }) => {
  return (
    <>
      <div className="categoryTab">
        <div className="tab" onClick={onClick}>
          <div className="dot">
            <div className="smallDot">Icons</div>
          </div>
          <div className="label">{label}</div>
        </div>
      </div>
      <div>
        {isContentVisible && <div className="content">{content}</div>}
      </div>
    </>
  );
};
