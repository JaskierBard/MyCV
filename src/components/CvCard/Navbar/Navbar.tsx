import React, { useState } from "react";
import "./Navbar.css";



export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("CV"); // Dodajemy stan śledzący aktywny element

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Ustawiamy aktywny element na kliknięty
  };

  return (
    <div className="Nav">
    
    </div>
  );
};