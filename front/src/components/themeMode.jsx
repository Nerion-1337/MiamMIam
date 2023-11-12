// REACT
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
// BUILDER
import Button from "#components/build/global/button";

export default function ThemeMode() {
//  
  const themeModeStorage = localStorage.getItem("themeMode");
  const faviconModeStorage = localStorage.getItem("favicon");
//
//
  const [themeMode, setThemeMode] = useState(`${themeModeStorage}`);
  const [favicon, setFavicon] = useState(`${faviconModeStorage}`);
//
//
useEffect(() => {
  if (themeMode === "dark" || themeMode === "light") {
  localStorage.setItem("themeMode", `${themeMode}`);
  localStorage.setItem("favicon", `${favicon}`);
  document.querySelector("html")?.setAttribute("data-theme", `${themeMode}`);
  }else{
    localStorage.setItem("themeMode", "dark");
    localStorage.setItem("favicon", "icon-st-b-a65a4ed3.svg");
    document.querySelector("html")?.setAttribute("data-theme", "dark");
    setThemeMode("dark");
    setFavicon("icon-st-b-a65a4ed3.svg");
  }
}, [themeMode, favicon]);
//
//
  const ThemeModeToggle = () => {
    const themeModeStorage = localStorage.getItem("themeMode");
    if (themeModeStorage === "dark") {
      setFavicon("icon-st-w-c02bf0a3.svg");
      setThemeMode(`light`);
      
    } else {
      setFavicon("icon-st-b-a65a4ed3.svg");
      setThemeMode(`dark`);   
    }
  };
//
//
  return (
    <>
    <Helmet>
    <link rel="icon" type="image/svg+xml" href={`./assets/${favicon}`} />
    </Helmet>
      <Button
      variant="t0"
      size="s4"
      fontSize="s4" 
      className={`theme ${themeMode}`} 
      fonction={ThemeModeToggle}
      /> 
    </>
  );
}

