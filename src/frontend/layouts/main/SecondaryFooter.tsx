import React, { useContext } from "react";
import "../../material/secondary-footer.css";
import { Link, useLocation, Location } from "react-router-dom";
import { ThemeContext } from "frontend/contexts/ThemeContext";

const SecondaryFooter = () => {
    const location: Location = useLocation();
    const { toggle } = useContext(ThemeContext);
    const colorStyle = toggle ? 'lightColor' : 'darkColor';

    return (
        <>
            <footer>
                <div className="bottom-line"></div>
                <div className="row main-footer m-auto">
                    {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-footer" > */}
                    <div className="col left-footer">
                        <p className={colorStyle}>@2023 Dint</p>

                        <div className="d-flex">
                            <a target="_blank" href="https://twitter.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/twitter.png")} /></a>
                            <a target="_blank" href="http://instagram.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/instagramlogo.png")} /></a>
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 right-footer"> */}
                    <div className="col right-footer">
                        <div className="row  footer-rows-mobile">
                            <div className="col-xs-6">
                                <Link to={`/help`}>
                                    <p className={colorStyle}>Help</p>
                                </Link>
                                <p className={colorStyle}>Store</p>
                                <Link to={`/cookies${location?.search}`}>
                                    <p className={colorStyle}>Cookie Notice</p>
                                </Link>

                            </div>
                            <div className="col-xs-6">
                                <p className={colorStyle}>Terms & Conditions </p>
                                <p className={colorStyle}>About</p>
                                <p></p>
                            </div>
                        </div>
                        <div className="row footer-rows-desktop ">
                            <div className="col-1"></div>
                            <div className=" col my-1 footer-column">




                            </div>
                            <div className="col my-1 footer-column">
                                <Link to={`/help`}>
                                    <p className={colorStyle}>Help</p>
                                </Link>
                                <Link to={"/terms"}><p className={colorStyle}>Terms of Service</p></Link>
                            </div>
                            <div className="col footer-column">

                                <Link to={"/privacy"}><p className={colorStyle}>Privacy</p></Link>
                                <Link to={`/cookies${location?.search}`}><p className={colorStyle}>Cookie Notice</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default SecondaryFooter;
