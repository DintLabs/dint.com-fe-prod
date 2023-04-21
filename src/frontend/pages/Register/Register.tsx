import useAuth from "frontend/hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../material/signup.css";
import { generateFromEmail } from "frontend/utils";
import { authInstance } from "frontend/contexts/FirebaseInstance";
import axios from "axios";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  browserSessionPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { dispatch } from "frontend/redux/store";
import { createWallet } from "frontend/redux/actions/createWallet";

import useUser from "frontend/hooks/useUser";

import { globalWindow } from "../../components/App";
import { ThemeContext } from "../../contexts/ThemeContext";
import Loading from "./Loading";

const Register = () => {
  const userHook = useUser();
  const navigate = useNavigate();
  const { register } = useAuth();

  const { location } = window;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType , setPasswordType] = useState("password");

  const [referCode , setReferCode] = useState();
  const [error_msg, setSignErr] = useState("");

  const data =  useLocation();
  const { toggle } = useContext(ThemeContext);
  const [isLoading , setIsLoading] = useState(false)
  useEffect(()=>{
    if(data.state && data.state.referCode){
      setReferCode(data.state.referCode)
    }else{
      navigate('/auth/refer' , {state :{for:"signup"}})
    }
  },[])

  // Initialize Firebase

  const auth = getAuth();


  const signup_sub = async () => {
    if (!name) {
      setSignErr("Name is required!");
      return;
    }
    if (!username) {
      setSignErr("Username is required!");
      return;
    }
    // if (email === confirmEmail) {
    if (email) {
      // if (password === confirmPassword) {
      if (password) {
        try {
          setIsLoading(true)
          // email and password matched Successfully
          const userData = {
            email,
            role: "simple",
            biography: "no biography yet",
            name: "user",
            city: "",
            profileImage:
              "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
            twitter: "",
            instagram: "",
            discord: "",
          };

          await register(email, password, userData);
          const user = globalWindow.userData;

          const generatedUserName = generateFromEmail(user?.email || "");

          const userData2 = {
            ...user,
            referred_by : referCode ,
            fire_base_auth_key: user?.uid,
            role: "simple",
            biography: "no biography yet",
            custom_username: username || generatedUserName || "",
            profile_image:
              user?.photoURL ??
              "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
            display_name: name || "",
          };
          await axios
            .post(
              `${process.env.REACT_APP_API_URL}api/auth/sign-up/`,
              userData2
            )

            .then(({ data }) => {
              localStorage.setItem("apiToken", data.data.token);
              // localStorage.setItem('userData', JSON.stringify(data.data));
              userHook.setCurrentUser(data.data);
              // dispatch(createWallet())

              toast.success("User registration done!");
              setIsLoading(false)
              onSuccessSignup();
            })

            .catch((err) => {
              console.error(err);
            });
        } catch (error: any) {
          switch (error.code) {
            case "auth/email-already-in-use":
              setSignErr("Email Address is Already in use, Try Another");
              break;
            case "auth/invalid-email":
              console.error(`Email address is invalid.`);
              setSignErr("Email is Invalid");
              break;
            case "auth/operation-not-allowed":
              console.error(`Error during sign up.`);
              setSignErr("Error in Registration");
              break;
            case "auth/weak-password":
              console.error(
                "Password is not strong enough. Add additional characters including special characters and numbers."
              );
              setSignErr("Minimum 6 characters are Required For Password");
              break;
            default:
              alert(error.message);
              break;
          }
        }
      } else {
        console.warn("password not match");
        setSignErr(
          "Password and Confirm Password is Not Matching!, Check it Again"
        );
      }
    } else {
      console.warn("email not match");
      setSignErr("Email and Confirm-Email Is Not Matching!, Check it Again");
    }
  };

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

            toast.success("User Login Successful!");
            onSuccessSignup();
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

                  toast.success("User registration done!");
                  onSuccessSignup();
                } else {
                  toast.error("User Not Found");
                }
              });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    })
    .catch((error) => {
      alert(error);
    });

  const onSuccessSignup = () => {
    if (location?.search) {
      const route = new URLSearchParams(location.search).get('r');

      if (route) navigate(route);
      else navigate('/lounge');
    } else navigate('/lounge');
  };

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
      await setPersistence(authInstance, browserSessionPersistence);

      signInWithRedirect(auth, provider)
        .then((result) => {
          console.log("result ", result);
        })
        .catch((e) => console.error("error in signin with ", e));
    } else {
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
              fire_base_auth_key: user.uid
            })
            .then(async ({ data }: any) => {
              if (data.code !== 400) {
                localStorage.setItem('apiToken', data.data.token);
                // localStorage.setItem('userData', JSON.stringify(data.data));
                userHook.setCurrentUser(data.data);

                toast.success('User Login Successful!');
                onSuccessSignup();
              } else {
                await axios
                  .post(`${process.env.REACT_APP_API_URL}api/auth/sign-up/`, userData)
                  .then(async ({ data }) => {
                    if (data.code !== 400) {
                      localStorage.setItem('apiToken', data.data.token);
                      // localStorage.setItem('userData', JSON.stringify(data.data));
                      userHook.setCurrentUser(data.data);

                      toast.success('User registration done!');
                      onSuccessSignup();
                    } else {
                      toast.error('User Not Found');
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
    }
  };

  const togglePassword= () =>{
    {passwordType =='password' ? setPasswordType('text') : setPasswordType('password')}
  }

  return (
    <>
      {isLoading ? <Loading /> :
    <>
    <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up to Dint" />
      </Helmet>
      <div className="main-container-signup">
        <div className="left-container">
          <img
            className="bg-left-img"
            src={require("../../assets/img/bg/bg_login.png")}
            alt="responsive image"
          />
          <p className="left-head position-absolute notranslate">Dint</p>
          <div className="bg-left-content d-flex justify-content-center">
            <div className="left-text">
              <p>Sign up to start earning</p>
            </div>
          </div>
        </div>
        <div className="right-container d-flex align-items-center" style={{background : toggle ? '#353535' : ''}}>
          <div
            className="login_divs"
            // style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="container px-1" style={{paddingTop:'5vh' , minHeight:"100vh" , textAlign:"center" ,color:toggle ? "#fff" : ''}}>
            <img
            className="right-logo"
            style={{margin: "0px 0px 0% 1.5%"}}
            src={require("../../assets/img/logos/logo-01.png")}
            alt="logo"
              />
              <div className="header"></div>
              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="username">
                  Full Name
                  <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' , border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                  </label>
              </div>
              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="username">
                  Username
                  <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' , border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value.toLowerCase())
                    }
                  />
                </label>
              </div>
              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="username">
                  Email
                <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' , border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    type="text"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                    </label>
              </div>
            {/* <div className="form-control">
              <label htmlFor="username">
                Confirm Email
                <input
                  type="email"
                  placeholder="Confirm Email"
                  value={confirmEmail}
                  onChange={(e: any) => setConfirmEmail(e.target.value)}
                />
              </label>
            </div> */}
              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="username">
                  Password
                <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' , border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    type={passwordType}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                {passwordType == 'text' ?  <i className="bi bi-eye" onClick={togglePassword}></i> : <i onClick={togglePassword} className="bi bi-eye-slash"></i> }

                </label>
              </div>
              {/* <div className="form-control">
            <label htmlFor="username">
              Confirm Password
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
            </label>
              </div> */}

              <p id="error_signup" style={{padding : "1% 2.5%"}}>{error_msg}</p>
              <div className="signup-div">
                <div className="form-check mt-3 mb-4" style={{textAlign:"left"}}>
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                  <label className="form-check-label mx-2"  htmlFor="exampleCheck1">By Signing Up You Agree to our <Link to={'/terms'}><span className="text-blue"> terms & service and privacy
                    Policy.</span></Link></label>
                </div>
                <button id="signup_btn" type="button" onClick={signup_sub}>
                  Sign Up
                </button>
                <div className="signup_text_div">
                <p style={{ color:toggle ? "#fff":"#353535" , opacity:toggle ?"0.6" : '1'}} >Already Have An Account?</p>
                <p style={{color:toggle ? "#fff" : '#353535'}} id="login_line">
                  <Link style={{color:toggle ? "#fff" : "#353535"}} to={`/auth/login${location?.search}`}>
                    <span id="signup_here"> Log In </span>
                  </Link>
                </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // marginTop: '20px'
                  }}
                >


                <div className="d-flex justify-content-between align-items-center horizontal">

                </div>



                  <div
                    style={{
                      width: "100%",
                      display: "flex",
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
      </div>
    </>
      }
    </>
  );
};

export default Register;

// return (
//   <>
//     <Helmet>
//       <title>Sign Up</title>
//       <meta name="description" content="Sign Up to Dint" />
//     </Helmet>

//     <br />
//     <div className="login_divs" style={{ maxWidth: '350px', margin: '0 auto' }}>
//       <div className="container">
//         <div className="header">
//           <br />

//           <br />
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Full Name
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Username
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Email
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e: any) => setEmail(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Confirm Email
//             <input
//               type="email"
//               placeholder="Confirm Email"
//               value={confirmEmail}
//               onChange={(e: any) => setConfirmEmail(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Password
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e: any) => setPassword(e.target.value)}
//             />
//           </label>
//         </div>
//         <div className="form-control">
//           <label htmlFor="username">
//             Confirm Password
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e: any) => setConfirmPassword(e.target.value)}
//             />
//           </label>
//         </div>

//         <p id="error_signup">{error_msg}</p>

//         <button id="signup_btn" type="button" onClick={signup_sub}>
//         Sign Up
//         </button>

//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '20px'
//           }}
//         >
//           <p id="login_line">
//             Already have an account?{' '}
//             <Link to={`/auth/login${location?.search}`}>
//               <span id="login_here"> Log in</span>
//             </Link>
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <button
//               type="button"
//               onClick={googleSignUp}
//               className="authbtnsocial"
//               style={{ backgroundColor: 'red' }}
//             >
//               Google
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );
