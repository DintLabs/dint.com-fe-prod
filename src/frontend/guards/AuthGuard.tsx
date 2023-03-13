import _axios from 'frontend/api/axios';
import { ReactNode, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const checkReferCode = async () => {
      const jsonUserData = localStorage.getItem('userData')
        let data = jsonUserData && JSON.parse(jsonUserData);
        await _axios.get('api/user/referral_code/').then((res:any)=>{
          if(res.data.code === 405){
            navigate('/auth/refer', {state : {for : 'login' , email : data.email}})
          }
        }).catch((err : any )=> navigate('/', { replace: true }))
    }
    checkReferCode();
  }, [])

  if (!localStorage.getItem('userData')) {
    Swal.fire({
      title: 'You are not logged in',
      text: 'Click login button to Login',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#CBC9C9',
      confirmButtonText: 'Login',
      cancelButtonText: 'Home'
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate(`/auth/login`, {
          state: {
            redirectUrl: pathname
          }
        });
      } else {
        navigate('/', { replace: true });
      }
    });
    return null;
  }

  return <>{children}</>;
}
