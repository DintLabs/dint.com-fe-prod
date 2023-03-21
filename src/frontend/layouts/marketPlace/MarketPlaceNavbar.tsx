import useAuth from 'frontend/hooks/useAuth';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import MetamaskLogin from '../../components/MetamaskLogin';
import mainlogo from '../../material/white.png';

const MarketPlaceNavbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const EditProfile = () => {
    navigate('/settings/profile');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" id="navmain">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={mainlogo} width="40" height="40" className="" alt="" />
            &nbsp; <span className="notranslate">Dint</span> Marketplace
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/marketplace/" className="navlinks">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/create" className="navlinks">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/my-listed-items" className="navlinks">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/my-purchases" className="navlinks">
              My Purchases
            </Nav.Link>
          </Nav>
          <div id="nav_last_part">
            {isAuthenticated ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ backgroundColor: 'transparent', border: 0, marginLeft: '15px' }}
                  >
                    <CgProfile size={35} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item style={{ color: 'black' }} onClick={EditProfile}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: 'black' }}
                      onClick={async () => {
                        await logout();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <MetamaskLogin />
              </>
            ) : (
              <>
                <div>
                  {' '}
                  <Link id="no_effect" to="/auth/login" state={{ redirectUrl: '/marketplace' }}>
                    login
                  </Link>
                </div>

                <div>
                  <Link id="no_effect" to="/signup" style={{ marginLeft: '15px' }}>
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MarketPlaceNavbar;
