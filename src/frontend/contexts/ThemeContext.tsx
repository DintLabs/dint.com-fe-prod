import  React, { useEffect } from  "react";

const  ThemeContext  =  React.createContext(false);
// Provider
// @ts-ignore
const  ThemeProvider  =  ({ children })  =>  {
  const  [toggle, setToggle]  =  React.useState(false);
  useEffect(()=>{
    const mode = localStorage.getItem('mode');
    if(mode === 'true') {
      setToggle(true);
    }else
      setToggle(false);
  },[]);
  const toggleFunction =  ()  =>  {
    setToggle(!toggle);
    localStorage.setItem('mode', String(!toggle));
  };
  // @ts-ignore
  return  (
    <ThemeContext.Provider value={{ toggle, toggleFunction }}>
      {children}
    </ThemeContext.Provider>
  );
};
export  {  ThemeContext,  ThemeProvider  };