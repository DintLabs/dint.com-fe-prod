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
              
                <div className="d-flex">
                    <a target="_blank" href="https://twitter.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/twitter.png")}/></a>
                    <a target="_blank" href="http://instagram.com/dint"><img className="social-logos" src={require("../../assets/img/socialmedia/instagramlogo.png")}/></a>
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
                        
                    </div>
                    <div className="col-xs-6">
                        <p>Terms & Conditions </p>
                        <p>About</p>
                        <p></p>
                    </div>
                </div>
                <div className="row footer-rows-desktop ">
                    <div className="col-1"></div>
                    <div className=" col my-1 footer-column">
                     
                       
                      
                        
                    </div>
                    <div className="col my-1 footer-column">
                    <p>Help</p>
                    <Link to={"/terms"}><p>Terms of Service</p></Link>
                    </div>
                    <div className="col footer-column">
                   
                        <Link to={"/privacy"}><p>Privacy</p></Link>
                        <Link to={`/cookies${location?.search}`}><p>Cookie Notice</p></Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};

export default SecondaryFooter;
