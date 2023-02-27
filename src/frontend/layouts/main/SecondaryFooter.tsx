import React, { useContext } from "react";
import "../../material/secondary-footer.css";
import { Link, useLocation, Location } from "react-router-dom";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, ListItemIcon , Typography } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LanguageIcon from '@mui/icons-material/Language';

const SecondaryFooter = () => {
    const [valueLang, setValueLang] = React.useState<string | null>(localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') :  'en');
    const location: Location = useLocation();
    const { toggle } = useContext(ThemeContext);
    const colorStyle = toggle ? 'lightColor' : 'darkColor';
    const loginOrSignup = location.pathname == '/auth/login' || location.pathname == '/auth/signup' || location.pathname == '/' ;

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
        <>
            <footer style={{background : loginOrSignup && toggle ? "#353535" : ''  }} id="secondary-footer">
                <div className="bottom-line"></div>
                <div className="row main-footer m-auto">
                    {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-footer" > */}
                    <div className="col left-footer">
                        <p className={colorStyle}>@2023 Dint</p>

                        <div className="d-flex">
                            <a target="_blank" href="https://twitter.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/twitter.png")} /></a>
                            <a target="_blank" href="http://instagram.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/instagramlogo.png")} /></a>
                        </div>
                        <Accordion  
                          onClick={(e) => e.stopPropagation()}
                          className="accordion"
                          sx={{background:'#fff'}}
                            >
                          <AccordionSummary
                            expandIcon={<ExpandLessIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <ListItemIcon>
                                <LanguageIcon />
                            </ListItemIcon>
                             <Typography component="span" translate="no">
                              {languages.filter((currLang) => currLang.value === valueLang)[0].title}
                            </Typography>
                          </AccordionSummary>
                          <RadioGroup
                              sx={{position:"absolute" , bottom:"90%" , background:"whitesmoke" , maxHeight:"500px" , overflow:"auto" , flexWrap:"unset" }}
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={valueLang}
                              onChange={handleChange}
                            >
                          {languages.map((oneLang, i) => (
                            <AccordionDetails key={i}>
                              <FormControlLabel
                                key={`${oneLang.value}_${i}`}
                                value={oneLang.value}
                                control={<Radio sx={{color:toggle ? "white" : "black"}}/>}
                                label={oneLang.title}
                                translate="no"
                              />
                            </AccordionDetails>
                          ))}
                          </RadioGroup>
                        </Accordion>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 right-footer"> */}
                    <div className="col right-footer">
                        <div className="row  footer-rows-mobile">
                            <div className="col-xs-6">
                                <Link className={colorStyle} to={`/help`}>
                                    <p >Help</p>
                                </Link>
                           
                                <Link className={colorStyle} to={`/cookies${location?.search}`}>
                                    <p>Cookie Notice</p>
                                </Link>

                            </div>
                            <div className="col-xs-6">
                            <Link className={colorStyle} to={"/terms"}><p>Terms of Service</p></Link>
                            <Link className={colorStyle} to={"/terms"}><p>Privacy</p></Link>
                                <p></p>
                            </div>
                        </div>
                        <div className="row footer-rows-desktop ">
                            <div className="col-1"></div>
                            <div className=" col my-1 footer-column">




                            </div>
                            <div className="col my-1 footer-column">
                                <Link className={colorStyle} to={`/help`}>
                                    <p >Help</p>
                                </Link>
                                <Link className={colorStyle} to={"/privacy"}><p>Terms of Service</p></Link>
                                
                            </div>
                            <div className="col footer-column">

                                <Link className={colorStyle} to={"/privacy"}><p>Privacy</p></Link>
                                <Link className={colorStyle} to={`/cookies${location?.search}`}><p>Cookie Notice</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default SecondaryFooter;
