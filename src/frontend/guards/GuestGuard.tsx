import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from 'frontend/redux/store';
import _axios from 'frontend/api/axios';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkReferCode = async()=>{
        await _axios.get('api/user/referral_code/').then((res:any)=>{
          if(res.data.code === 200){
            navigate('/lounge')
          }
        }).catch((err : any )=> console.log(err))
    }
    if(location.pathname == '/auth/refer'){
      checkReferCode()
    }else{
      if (localStorage.getItem('apiToken') !== null) {
        navigate('/lounge')
      }
    }
  }, [])
  

  return <>{children}</>;
}
