import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../material/signup.css" ;
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import _axios from "frontend/api/axios";
import { toast } from "react-toastify";
import { ThemeContext } from "frontend/contexts/ThemeContext";

const RegistrationRefer = () =>{
    const [referCode , setReferCode] = useState('');
    const [ error_msg_login , setErrMsg ] = useState('');
    const [btnVal , setbtnVal] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const regex = /^[A-z0-9]/ ;
    const [validReferCode , setValidReferCode] = useState(false)
    const {state} = location;
    const { toggle } = useContext(ThemeContext);

    useEffect(()=>{ 
      if(state && state.for === 'login'){
        setbtnVal('Login for Dint')
      }else{
        setbtnVal('Continue')
      }
    },[])

    const addReferralCode = async() =>{
      const addRefCodeData = {
        email : state.email ,
        referral_code : referCode
      } 
      await _axios.post(`api/user/add_referral_code/`,addRefCodeData).then((res:any)=>{ 
        if(res.data.code === 200){
          navigate(`/lounge${location?.search}`)
          toast.success("User Login successfully")
        }
      }).catch((err:any)=>{
          console.log(err);
          toast.error('There might be some error ! Please try again later')
      })
    }

    const validateReferralCode = async()=>{
      const data = { "referred_code" : referCode }
      await _axios.post(`api/user/validate_referral_code/`, data)
      .then(async(response: any) => {
        if(response.data.code !== 200 ){
          setErrMsg('Invalid referral code!')
        }else if(response.status !== 200){
          toast.error('There might be some error ! Please try again later')
        }
        else{
          if(state && state.for === 'login'){
              await addReferralCode()
          }else{
            navigate(`/auth/signup${location?.search}` , {state : {referCode}})
          }
          setValidReferCode(true)
        }
      }).catch((err : any) =>{
        console.log(err)
        toast.error('There might be some error ! Please try again later')
      })
    }

    const signupClicked = async() =>{
        const validation = regex.test(referCode);
        if(validation){
          await validateReferralCode()
        }else{
          setErrMsg('Please Enter code!')
        }
    }
    return (
      <>
      {/* <MainNavbar /> */}
      <Helmet>
        <title>Reference</title>
        <meta name="description" content="Reference for registration" />
      </Helmet>
      {/* <NavbarHome /> */}
      <div className="main-container-refer" style={{background : toggle ? '#353535' : ''}}>
        <div className="right-container-refer" >
          <div className="login_divs" >
          <img className="right-logo" onClick={()=>navigate('/')}  src={require("../../assets/img/logos/logo-01.png")} alt="logo" />
              <div className="container" style={{paddingTop: "30px"}}>
              <div className="header">{/* <h1>{props.islogin}</h1> */}</div>
              <div className="form-control" style={{ background : toggle ? "#353535" : '' , color:toggle ? "#fff" : '' }}>
                <label htmlFor="email"> Referal Code </label>
                <input
                    style = {{ background: toggle ? "#353535" : ''  , color:toggle ? "white" : '' ,   border: toggle ? '2px solid rgba(255, 255, 255, 0.4)' :'2px solid #f0f0f0'}}
                    id="referalCode"
                    type="text"
                    placeholder="Enter referal code"
                    value={referCode}
                    onChange={(e: any) => setReferCode(e.target.value)}
                  />
              </div>

              <p style={{marginLeft:"3%"}} id="error_signup">{error_msg_login}</p>
              <div className="signup-div">
              <button id="signup_btn" type="button" onClick={signupClicked}>
                {btnVal}
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
    )
}

export default RegistrationRefer ;