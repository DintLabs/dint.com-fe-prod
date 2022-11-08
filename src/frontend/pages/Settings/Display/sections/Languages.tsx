import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import BackBlock from 'frontend/components/submenu/sections/BackBlock';
import { Box } from '@mui/material';

const languages = [
  {
    title: 'English',
    value: 'en'
  },
  {
    title: 'Chinese Simplified',
    value: 'zh-CN'
  },
  {
    title: 'Chinese Traditional',
    value: 'zh-TW'
  },
  {
    title: 'Portuguese',
    value: 'pt'
  },
  {
    title: 'Spanish',
    value: 'es'
  },
  {
    title: 'Japanese',
    value: 'ja'
  },
  {
    title: 'Korean',
    value: 'ko'
  },
  {
    title: 'Hindi',
    value: 'hi'
  },
  {
    title: 'French',
    value: 'fr'
  },
  {
    title: 'German',
    value: 'de'
  },
  {
    title: 'Italian',
    value: 'it'
  },
  {
    title: 'Romanian',
    value: 'ro'
  },
  {
    title: 'Arabic',
    value: 'ar'
  },
  {
    title: 'Ukrainian',
    value: 'uk'
  },
  {
    title: 'Russian',
    value: 'ru'
  }
];

export default function Languages() {
  const [valueLang, setValueLang] = React.useState<string | null>(localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en');

  const currentLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en';

  if (valueLang !== currentLanguage) {
    setValueLang(currentLanguage);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLang((event.target as HTMLInputElement).value);
    const selectedLanguage = (event.target as HTMLInputElement).value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    const languageDropdown = $('.goog-te-combo');
    languageDropdown.val(selectedLanguage);
    languageDropdown[0].dispatchEvent(new Event('change'))
  };

  return (
    <Box
      sx={{
        cursor: 'pointer',
        borderRadius: 1,
        '&:hover': {
          '.labels': {
            color: `#7635dc !important`
          }
        }
      }}
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDirection="column"
    >
     <span className='notranslate'>
       <BackBlock title="Language"/>
     </span>

      <FormControl style={{ padding: '0 0 0 12px' }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={valueLang}
          onChange={handleChange}
        >
          {languages.map((lang, i) => (
            <FormControlLabel
              key={`${lang.value}_${i}`}
              value={lang.value}
              control={<Radio />}
              label={lang.title}
              className="primary-text-color"
              translate="no"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
