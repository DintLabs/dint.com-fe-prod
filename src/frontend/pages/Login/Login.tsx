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
import { useState } from "react";
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

const Login = () => {
  const userHook = useUser();
  const { login } = useAuth();
  const location: Location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

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
            toast.success("User Login Successful!");
            onSuccessLogin();
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
                  toast.success("User Login Successful!");
                  onSuccessLogin();
                } else {
                  toast.error("User Not Found");
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
        .then(({ data }: any) => {
          if (data.code === 400) {
            toast.error("Invalid Credantials");
          } else {
            localStorage.setItem("apiToken", data.data.token);
            // localStorage.setItem('userData', JSON.stringify(data.data));
            userHook.setCurrentUser(data.data);
            // dispatch(createWallet());
            onSuccessLogin();
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
                toast.success("User Login Successful!");
                onSuccessLogin();
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

                      toast.success("User Login Successful!");
                      onSuccessLogin();
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

  // const fbSignin = () => {
  //   const provider = new FacebookAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const { user } = result;
  //       console.log(user);
  //       props.loginStateChange();
  //       props.setemail(user.email);
  //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       const { accessToken } = credential;

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const { email } = error.customData;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);

  //       // ...
  //     });
  // };

  // const appleSignin = () => {
  //   const provider = new OAuthProvider('apple.com');
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const { user } = result;

  //       console.log(user);
  //       props.loginStateChange();
  //       props.setemail(user.email);
  //       // Apple credential
  //       // const credential = OAuthProvider.credentialFromResult(result);
  //       // const { accessToken } = credential;
  //       // const { idToken } = credential;

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const { email } = error.customData;
  //       // The credential that was used.
  //       const credential = OAuthProvider.credentialFromError(error);

  //       // ...
  //     });
  // };

  // useEffect(() => {
  //   onAuthStateChanged(authInstance, (user) => {
  //     if (user) {
  //       navigate(redirectUrl);
  //     } else {
  //       console.log('user is not loggedin');
  //     }
  //   });
  // }, []);

  const onSuccessLogin = () => {
    if (location?.search) {
      const route = new URLSearchParams(location.search).get("r");

      if (route) navigate(route);
      else navigate("/lounge");
    } else navigate("/lounge");
  };

  return (
    <>
      {/* <MainNavbar /> */}
      <Helmet>
        <title>Dint - Social Media with Referral Monetization powered by Smart Contracts</title>
        <meta name="description" content="
Dint is a new social media platform with referral-based monetization, smart contracts, and content earning opportunities. Earn money by referring friends and their activity. Create content and earn through tips and subscriptions. With Dint, you're in control of your earnings.
" />
      </Helmet>
      {/* <NavbarHome /> */}
      <br />
      <br />
      <div
        className="login_divs"
        style={{ maxWidth: "350px", margin: "0 auto" }}
      >
        <div className="container">
          <div className="header">{/* <h1>{props.islogin}</h1> */}</div>

          <div className="form-control">
            <label htmlFor="email">
              Email
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control">
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </label>
            <button
              id="forgotpassBtn"
              type="button"
              onClick={forgotPassClicked}
            >
              <span id="forgotPassText">Forgot Password?</span>{" "}
            </button>
          </div>

          <p id="error_signup">{error_msg_login}</p>
          <button id="signup_btn" type="button" onClick={loginClicked}>
            Log In
          </button>

          <p id="signup_line">
            Not registered Yet?{" "}
            <Link to={`/auth/signup${location?.search}`}>
              <span id="signup_here"> Sign Up</span>
            </Link>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={googleSignin}
              className="authbtnsocial"
              style={{ backgroundColor: "red" }}
            >
              Google
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Login;
