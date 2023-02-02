import React from "react";
import "../../material/secondary-footer.css";
import { Link, useLocation , Location} from "react-router-dom";

const SecondaryFooter = () => {
    const location: Location = useLocation();
  
  return (
    <>
    <footer>
        <div className="row main-footer">
            <div className="col-lg-3 col-md-4 col-xs-12 col-sm-4 my-1 footer-column">
                <p>@2023 Dint</p>
                <p>Contact</p>
                <div className="f-line"></div>
                <div className="btn-group">
                    <button className="btn  btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        English
                    </button>
                    <div className="dropdown-menu">
                        <p className="dropdown-item" >Spanish</p>
                        <p className="dropdown-item" >French</p>
                    </div>
                </div>
                <p>Share</p>
                <div className="bottom-line"></div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-12 my-1 footer-column">
                <p>Help</p>
                <p>Store</p>
                <Link to={`/cookies${location?.search}`}>
                <p>Cookie Notice</p>
                </Link>
                <p>Dint Safety & Transperancy Center</p>
                <div className="bottom-line"></div>

            </div>
            <div className="col-lg-2 col-md-4 col-sm-4  col-xs-12 my-1 footer-column">
                <p>About</p>
                <Link to={"/terms"}>
                <p>Terms of Service</p>
                </Link>
                <p>DMCA</p>
                <p>Statement</p>
                <div className="bottom-line"></div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-12  my-1 footer-column">
                <p>Blog</p>
                <Link to={"/privacy"}>
                <p>Privacy</p>
                </Link>
                <p>USC 2257</p>
                <p>Acceptable Use Policy</p>
                <div className="bottom-line"></div>

            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12  my-1 footer-column ">
                <p>Branding</p>
                <p>Complaints Policy</p>
                <p>Standard Contract</p>
            </div>
        </div>
    </footer>
    </>
  );
};

export default SecondaryFooter;
