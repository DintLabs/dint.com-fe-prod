import {
  browserSessionPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import axios from "axios";
import { authInstance } from "frontend/contexts/FirebaseInstance";
import useAuth from "frontend/hooks/useAuth";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Link,
  Location,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../../material/signup.css";
import { generateFromEmail } from "frontend/utils";
import { toast } from "react-toastify";
import { createWallet } from "frontend/redux/actions/createWallet";
import { dispatch, RootState } from "frontend/redux/store";

import useUser from "frontend/hooks/useUser";
import { useDispatch } from "react-redux";
import _axios from "frontend/api/axios";
import { ThemeContext } from "../../contexts/ThemeContext";

const Login = () => {
  const userHook = useUser();
  const { login } = useAuth();
  const location: Location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType , setPasswordType] = useState("password");

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { toggle } = useContext(ThemeContext);

  getRedirectResult(auth)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      if (result?.user == null) return;
      const { user } = result;

      const username = generateFromEmail(user.email || "");
      const userData = {
        ...user,
        fire_base_auth_key: user?.uid,
        role: "simple",
        biography: "no biography yet",
        custom_username: username ?? "",
        profile_image:
          user?.photoURL ??
          "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
        display_name: user?.displayName ?? "",
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}api/auth/login`, {
          email: user.email,
          fire_base_auth_key: user.uid,
        })
        .then(async ({ data }: any) => {
          if (data.code !== 400) {
            localStorage.setItem("apiToken", data.data.token);
            // localStorage.setItem('userData', JSON.stringify(data.data));
            userHook.setCurrentUser(data.data);
            // dispatch(createWallet());
            
            if(data.message === "User don't have referral code"){
              navigate('/auth/refer' , {state : {for : 'login' ,email :data.data.email}})
            }
            else{
              toast.success("Login Successful!");
              onSuccessLogin();
            }
            // onSuccessLogin();
          } else {
            await axios
              .post(
                `${process.env.REACT_APP_API_URL}api/auth/sign-up/`,
                userData
              )
              .then(async ({ data }) => {
                if (data.code !== 400) {
                  localStorage.setItem("apiToken", data.data.token);
                  // localStorage.setItem('userData', JSON.stringify(data.data));
                  userHook.setCurrentUser(data.data);
                  // dispatch(createWallet());
                  if(data.message === "User don't have referral code"){
                    navigate('/auth/refer' , {state : {for : 'login' ,email :data.data.email}})
                  }
                  else{
                    toast.success("Login Successful!");
                    onSuccessLogin();
                  }
                  // onSuccessLogin();
                } else {
                  toast.error("Not Found");
                }
              });
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    })
    .catch((error) => {
      alert(error);
    });

  const [error_msg_login, setLoginErr] = useState("");

  const loginClicked = async () => {
    try {
      await setPersistence(authInstance, browserSessionPersistence);
      const data = await login(email, password);
      await axios
        .post(`${process.env.REACT_APP_API_URL}api/auth/login`, {
          email,
          fire_base_auth_key: data.user.uid,
        })
        .then(async({ data }: any) => {
          if (data.code === 400) {
            toast.error("Invalid Credantials");
          } else {
            localStorage.setItem("apiToken", data.data.token);
            // localStorage.setItem('userData', JSON.stringify(data.data));
            userHook.setCurrentUser(data.data);
            // dispatch(createWallet());
            await _axios.get('api/user/referral_code/')
            .then((res:any)=>{
              if(res.data.code === 200){
                toast.success("User Login Successfully")
                onSuccessLogin();
              }else{
                navigate('/auth/refer' , {state : {for : 'login' , email :data.data.email}})
              }
            })
            .catch((err:any)=> {
              toast.error("there might be some error please try again later")
            })
            // if(data.message === "User don't have referral code"){
            //   navigate('/auth/refer' , {state : {for : 'login' , email :data.data.email}})
            // }
            // else{
            //   toast.success("User Login Successfully")
            //   onSuccessLogin();
            // }
          }
        })
        .catch((err: any) => {
          console.error(err);
        });
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        console.error(`User is Not Found`);
        setLoginErr("User Not Found");
      } else if (error.code === "auth/wrong-password") {
        console.error(`Wrong Password`);
        setLoginErr("Wrong Password");
      } else if (error.message) {
        console.error(error.message);
        setLoginErr("Something Went Wrong");
      } else {
        alert("Email is empty");
        console.error(error);
      }
    }
  };

  const forgotPassClicked = () => {
    if (email !== "") {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Email Sent");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
        });
    }
  };

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();

    // if (
    //   navigator.userAgent.match(/Android/i) ||
    //   navigator.userAgent.match(/iPhone/i)
    // ) {
    //   await setPersistence(authInstance, browserSessionPersistence);
    //   signInWithRedirect(auth, provider)
    //     .then(() => {})
    //     .catch((e) => console.error(e));
    // } else {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;

        const username = generateFromEmail(user.email || "");
        const userData = {
          ...user,
          fire_base_auth_key: user?.uid,
          role: "simple",
          biography: "no biography yet",
          custom_username: username ?? "",
          profile_image:
            user?.photoURL ??
            "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
          display_name: user?.displayName ?? "",
        };

        await axios
          .post(`${process.env.REACT_APP_API_URL}api/auth/login`, {
            email: user.email,
            fire_base_auth_key: user.uid,
          })
          .then(async ({ data }: any) => {
            if (data.code !== 400) {
              localStorage.setItem("apiToken", data.data.token);
              // localStorage.setItem('userData', JSON.stringify(data.data));
              userHook.setCurrentUser(data.data);
              // dispatch(createWallet());
              await _axios.get('api/user/referral_code/')
            .then((res:any)=>{   
              console.log("google login", res)           
              if(res.data.code === 200){
                toast.success("User Login Successfully")
                onSuccessLogin();
              }else{
                navigate('/auth/refer' , {state : {for : 'login' , email :data.data.email}})
              }
            })
            .catch((err:any)=> {
              console.log(err);
              toast.error("there might be some error please try again later")
            })
              // if(data.message === "User don't have referral code"){
              //   navigate('/auth/refer' , {state : {for : 'login' ,email :data.data.email}})
              // }
              // else{
              //   toast.success("User Login Successful!");
              //   onSuccessLogin();
              // }
              // onSuccessLogin();
            } else {
              await axios
                .post(
                  `${process.env.REACT_APP_API_URL}api/auth/sign-up/`,
                  userData
                )
                .then(async ({ data }) => {
                  if (data.code !== 400) {
                    localStorage.setItem("apiToken", data.data.token);
                    // localStorage.setItem('userData', JSON.stringify(data.data));
                    userHook.setCurrentUser(data.data);

                    await _axios.get('api/user/referral_code/')
                      .then((res:any)=>{
                        if(res.data.code === 200){
                          toast.success("User Login Successfully")
                          onSuccessLogin();
                        }else{
                        navigate('/auth/refer' , {state : {for : 'login' , email :data.data.email}})
                        }
                      })
                      .catch((err:any)=> {
                        toast.error("there might be some error please try again later")
                      })
                    
                    // if(data.message === "User don't have referral code"){
                    //   navigate('/auth/refer' , {state : {for : 'login' ,email :data.data.email}})
                    // }
                    // else{
                    //   toast.success("User Login Successful!");
                    //   onSuccessLogin();
                    // }
                    // onSuccessLogin();
                  }
                });
            }
          })
          .catch((err: any) => {
            console.error(err);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.error(errorMessage);
      });
    // }
  };


  const onSuccessLogin = () => {
    if (location?.search) {
      const route = new URLSearchParams(location.search).get("r");

      if (route) navigate(route);
      else navigate("/lounge");
    } else navigate("/lounge");
  };

  const togglePassword= () =>{
    {passwordType =='password' ? setPasswordType('text') : setPasswordType('password')}
  }

  return (
    <>
      {/* <MainNavbar /> */}
      <Helmet>
      <link rel="canonical" href="https://dint.com"/>
        <title>{'Empowering Musicians, Artists, and Entertainers to Enhance Earnings - Dint Club'}</title>
        <meta name="description" content="Discover Dint Club, the referral-based social network for musicians, artists, and entertainers. Join now to connect with peers, showcase your talents, and boost your earnings through NFTs and our monetization features. Sign up and start growing your network today!" />
      </Helmet>
      {/* <NavbarHome /> */}
      <div className="main-container-login">
        <div className="left-container">
          <img  className="bg-left-img" src={require("../../assets/img/bg/bg_login.png")} alt="responsive image"/>
          
          <p className="left-head position-absolute notranslate">Dint Club</p>
          <div className="bg-left-content d-flex justify-content-center">
            <div className="left-text">
              <p >Sign up to support your favorite musicians, artists, and entertainers. 
          </p>
              </div>
          </div>
        </div>
        <div className="right-container" style={{background : toggle ? '#353535' : ''}}
        >
          <div
            className="login_divs"
            // style={{ maxWidth: "340px", margin: "0 auto" }}
            // style={{ maxWidth: "600px", margin: "0 auto" , width:"100%" }}
          >
              <div className="container " style={{paddingTop: '5vh' , minHeight:"100vh" , textAlign:"center" , color:toggle ? "#fff" : ''}} >
          <img className="right-logo"  style={{margin: "0px 0px 15% 1.5%"}} src={require("../../assets/img/logos/logo-01.png")} alt="logo" />
              <div className="header">{/* <h1>{props.islogin}</h1> */}</div>

              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="email">
                  Email
                 
                </label>
                <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' ,   border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
              </div>

              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : ''  }}>
                <label htmlFor="password">
                  Password
                 
                </label>
                <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' , border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    id="password"
                    type={passwordType}
                    placeholder="Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  {passwordType == 'text' ?  <i className="bi bi-eye" style={{top:"60%"}} onClick={togglePassword}></i> : <i style={{top:"60%"}} onClick={togglePassword} className="bi bi-eye-slash"></i> }
                  
              </div>
              <div className="d-flex justify-content-between px-4">
                  <div className="form-check remember-me">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label mx-2"  htmlFor="exampleCheck1">Remember me</label>
                  </div>           
                  <button
                  id="forgotpassBtn"
                  type="button"
                  onClick={forgotPassClicked}
                  >
                    <span style={{color :toggle ? "#fff" :''}} id="forgotPassText">Forgot Password?</span>{" "}
                  </button>
                </div>

              <p id="error_signup" style={{marginLeft :"3%"}}>{error_msg_login}</p>
              <div className="signup-div">
              <button id="signup_btn" type="button" onClick={loginClicked}>
                Log In
              </button>
              <div className="signup_text_div">
                <p style={{ color:toggle ? "#fff":"#353535" , opacity:toggle ?"0.6" : '1'}}>Don't Have An Account?</p>
                <p style={{color:toggle ? "#fff" : '#353535'}} id="signup_line">
                  <span onClick={()=>navigate(`/auth/refer${location?.search}` , {state : {for :"signup"}})} id="signup_here"> Sign Up </span>
                </p>
              </div>
                <div className="d-flex justify-content-between align-items-center horizontal">
                <div className="line" style={{border:toggle ? '1px solid rgba(255, 255, 255, 0.4)' :'1px solid rgba(0, 0, 0, 0.08)'}}></div>
                <p className="m-3">Or</p>
                <div className="line" style={{border:toggle ? '1px solid rgba(255, 255, 255, 0.4)' :'1px solid rgba(0, 0, 0, 0.08)'}}></div>
              </div>

             
              <button
                  type="button"
                  onClick={googleSignin}
                  className="socialbtn "
                  style={toggle ? { background : '#353535' , color:"#fff" } : { background : '#fff' , color:"#000"  }}
                >
                <img src={require("../../assets/img/socialmedia/googlelogo.png")} className="mx-2 google-logo" alt="" style={{height:'20px' , background : toggle ? '' : "#fff"}} />  Log In with Google
                </button>
          
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
               
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Login;
