import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';

import { authInstance } from 'frontend/contexts/FirebaseInstance';
import mainlogo from '../material/white.png';
import MetamaskLogin from './MetamaskLogin';
import _axios from 'frontend/api/axios';

const Navigation = () => {
  const navigate = useNavigate();

  const [islogin] = useState(false);

  const logout = async () => {

    const obj = {
      is_online: false,
    };

    await _axios
      .put(`/api/user/update-status/`, obj)
      .then((response: any) => {
        console.log("response", response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    authInstance
      .signOut()
      .then(() => {
        alert('logout success');
        window.location.reload();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const EditProfile = () => {
    navigate('/settings/profile');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" id="navmain">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={mainlogo} width="40" height="40" className="" alt="" />
            &nbsp; <span className="notranslate">Dint Marketplace</span>
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
            {islogin ? (
              <>
                {/* <div className="navlinks"></div> */}
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ backgroundColor: 'transparent', border: 0, marginLeft: '15px' }}
                  >
                    <button id="profile_btn" type="button">
                      <CgProfile size={35} />
                    </button>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item style={{ color: 'black' }} onClick={EditProfile}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item style={{ color: 'black' }} onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* wallet */}
                <MetamaskLogin />
                {/* <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div>
                            <div id="mySidenav" className="sidenav">
                                    <button className="closebtn" onClick={closeNav}>×</button>
                                    <div id="sidenav_child">
                                        <div id="sidenav_top_div">
                                            <CgProfile size={35} /> <div > <p>Connect Wallet</p></div>
                                        </div>
                                        <div id="wallets_parent_div">
                                            <div className="wallets_div" onClick={web3Handler}><img src={Metamask_icon}></img>  <p>Metamask</p></div>
                                            <div className="wallets_div last_wallet" onClick={other_wallet_clicked}> <p>Other Wallets</p></div>
                                        </div>
                                    </div>
                                </div> */}
              </>
            ) : (
              <>
                <div>
                  {' '}
                  <Link id="no_effect" to="/login/marketplace">
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
            {/* {account ? (
                            <>
                                <Nav.Link
                                    href={`https://etherscan.io/address/${account}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button nav-button btn-sm mx-4">
                                    <Button variant="outline-light">
                                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                    </Button>
                                </Nav.Link>
                                <div className="navlinks"><button id="profile_btn" onClick={openProfile}  > <CgProfile size={35} /></button></div>
                            </>
                        ) : (
                            <>
                                <div className="navlinks"><button id="wallet_btn" onClick={openNav} > <MdOutlineAccountBalanceWallet size={35} /></button></div>

                                <div className="navlinks"><button id="profile_btn" onClick={openProfile}  > <CgProfile size={35} /></button></div>


                                <div id="mySidenav" className="sidenav">
                                    <button className="closebtn" onClick={closeNav}>×</button>
                                    <div id="sidenav_child">
                                        <div id="sidenav_top_div">
                                            <CgProfile size={35} /> <div > <p>Connect Wallet</p></div>
                                        </div>
                                        <div id="wallets_parent_div">
                                            <div className="wallets_div" onClick={web3Handler}><img src={Metamask_icon}></img>  <p>Metamask</p></div>
                                            <div className="wallets_div last_wallet" onClick={other_wallet_clicked}> <p>Other Wallets</p></div>
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        )} */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
