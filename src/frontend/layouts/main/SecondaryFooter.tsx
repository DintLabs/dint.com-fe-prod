import React from "react";
import "../../material/secondary-footer.css";
import { Link, useLocation , Location} from "react-router-dom";

const SecondaryFooter = () => {
    const location: Location = useLocation();
  
  return (
    <>
    <footer>
        <div className="bottom-line"></div>
        <div className="row main-footer m-auto">
            {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-footer" > */}
            <div className="col left-footer">
                <p>@2023 Dint</p>
                <p>Contact</p>
                <div className="d-flex">
                    <img className="social-logos" src={require("../../assets/img/web3/twitter.png")}/>
                    <img className="social-logos" src={require("../../assets/img/web3/instagramlogo.png")}/>
                </div>
            </div>
            {/* <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 right-footer"> */}
                <div className="col right-footer">
                <div className="row  footer-rows-mobile">
                    <div className="col-xs-6">
                        <p>Help</p>
                        <p>Store</p>
                        <Link to={`/cookies${location?.search}`}>
                        <p>Cookie Notice</p>
                        </Link>
                        <p>Terms & Conditions </p>
                        <p>About</p>
                    </div>
                    <div className="col-xs-6">
                        <Link to={"/terms"}><p>Terms of Service</p></Link>
                        <p>DMCA</p>
                        <p>Blog</p>
                        <Link to={"/privacy"}><p>Privacy</p></Link>
                        <p>USC 2257</p>
                    </div>
                </div>
                <div className="row footer-rows-desktop ">
                    <div className="col-1"></div>
                    <div className=" col my-1 footer-column">
                        <p>Help</p>
                        <p>Store</p>
                        <Link to={`/cookies${location?.search}`}><p>Cookie Notice</p></Link>
                        <p>Terms & Conditions </p>
                    </div>
                    <div className="col my-1 footer-column">
                        <p>About</p>
                        <Link to={"/terms"}><p>Terms of Service</p></Link>
                        <p>DMCA</p>
                    </div>
                    <div className="col footer-column">
                        <p>Blog</p>
                        <Link to={"/privacy"}><p>Privacy</p></Link>
                        <p>USC 2257</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};

export default SecondaryFooter;
