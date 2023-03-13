import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeContextWrapper(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  const [theme, setTheme] = useState("dark");

  function changeTheme(theme: React.SetStateAction<string>) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case "light":
        console.log("light")
        document.body.classList.add('white-content');
        break;
      case "dark":
      default:
        console.log("dark")
        document.body.classList.remove('white-content');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}