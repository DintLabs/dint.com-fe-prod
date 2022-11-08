import { Stack, Switch, Typography } from '@mui/material';
import Submenu from 'frontend/components/submenu';

import { settingsSubmenuLanguage } from 'frontend/data';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { useState, useContext } from 'react';
import './mode.css';
import {ThemeContext} from '../../../contexts/ThemeContext'

// export const ThemeContext = createContext(null);

const Display = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((cur)=>(cur === "light" ? "dark" : "light"));
  }
  // console.log('isDark', isDark);

  const { toggle, toggleFunction } = useContext(ThemeContext);

  // @ts-ignore

  const currentLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en';
  return (
      <Stack style={{ width: '100%' }}>
        <Submenu
          title="Display"
          username="Customize your view"
          routes={settingsSubmenuLanguage(currentLanguage)}
          noTag
          md={12}
        />
        <GridWithBoxConteiner>
          <Typography className="primary-text-color" variant="subtitle2">
            Dark Mode
          </Typography>
              <Switch
                checked={toggle}
                onChange={toggleFunction}
                color="secondary"
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: !toggle && 'black'
                  }
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
        </GridWithBoxConteiner>
      </Stack>
  );
};

export default Display;
