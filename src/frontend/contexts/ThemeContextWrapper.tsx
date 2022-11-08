import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export default function ThemeContextWrapper(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme: React.SetStateAction<string>) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        console.log("light")
        document.body.classList.add('white-content');
        break;
      case themes.dark:
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