import { Box, Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { FaDiscord, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import '../../material/Footer.css';
import mainlogo from '../../material/white.png';

const MainFooter = () => {
  const navigate = useNavigate();
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return (
    <>
      <div>
        <footer style={{ marginTop: '200px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#000000"
              fillOpacity="1"
              d="M0,128L120,154.7C240,181,480,235,720,224C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            />
          </svg>
          <div className="footer">
            <section>
              <h4 className="footer_link_title notranslate" style={{ marginBottom: '30px' }}>
                <img src={mainlogo} id="footer_logo" alt="footer_logo" /> <span className="notranslate">Dint</span>{' '}
              </h4>
              <p id="company_desc_footer">
                Revolutionizing The World of Entertainment Through NFTs and Membership Tokens
              </p>
            </section>

            <section className="middle_on_mobile" />
            <section className="middle_on_mobile" />
            <section className="middle_on_mobile hide_on_leptop">
              <h4 className="footer_link_title"> Community</h4>
              <div className="social_parent">
                <a href="https://twitter.com/dint">
                  {' '}
                  <div className="social_box" style={{ margin: 0 }}>
                    <FaTwitter size={20} />
                  </div>
                </a>
                <a href="https://www.instagram.com/dint">
                  {' '}
                  <div className="social_box">
                    <FaInstagram size={20} />
                  </div>
                </a>
                <a href="https://discord.gg/zk97Vf4YyX">
                  {' '}
                  <div className="social_box">
                    <FaDiscord size={20} />
                  </div>
                </a>
                <a href="https://www.facebook.com/dintclub">
                  {' '}
                  <div className="social_box">
                    <FaFacebookF size={20} />
                  </div>
                </a>
                <a href="https://www.youtube.com/channel/UCGXYFkXyYYIZIjOyjDQ6S7w">
                  {' '}
                  <div className="social_box">
                    <FaYoutube size={20} />
                  </div>
                </a>
              </div>
              <Box>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer', textAlign: 'left' }}
                  onClick={() => navigate('/privacy')}
                  sx={{ color: '#919EAB', px: widthScreen >= 900 ? 0 : 1, letterSpacing: '0.08em ', lineHeight: '1.8em' }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer', textAlign: 'left' }}
                  onClick={() => navigate('/cookies')}
                  sx={{ color: '#919EAB', px: widthScreen >= 900 ? 0 : 1, letterSpacing: '0.08em ', lineHeight: '1.8em' }}
                >
                  Cookie Notice
                </Typography>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer', textAlign: 'left' }}
                  onClick={() => navigate('/terms')}
                  sx={{ color: '#919EAB', px: widthScreen >= 900 ? 0 : 1, letterSpacing: '0.08em ', lineHeight: '1.8em' }}
                >
                  Terms of Service
                </Typography>
              </Box>
            </section>
          </div>
        </footer>
        <div className="sub-footer">
          <div className="social_parent" id="leptop_social">
            <a href="https://twitter.com/dint">
              {' '}
              <div className="social_box" style={{ margin: 0 }}>
                <FaTwitter size={20} />
              </div>
            </a>

            <a href="https://www.instagram.com/dint">
              {' '}
              <div className="social_box">
                <FaInstagram size={20} />
              </div>
            </a>
            <a href="https://discord.gg/zk97Vf4YyX">
              {' '}
              <div className="social_box">
                <FaDiscord size={20} />
              </div>
            </a>
            <a href="https://www.facebook.com/dintclub">
              {' '}
              <div className="social_box">
                <FaFacebookF size={20} />
              </div>
            </a>
            <a href="https://www.youtube.com/channel/UCGXYFkXyYYIZIjOyjDQ6S7w">
              {' '}
              <div className="social_box">
                <FaYoutube size={20} />
              </div>
            </a>
          </div>
          <span className="notranslate">Copyright ©2022 All rights reserved | dint.com</span>
        </div>
      </div>
    </>
  );
};

export default MainFooter;
