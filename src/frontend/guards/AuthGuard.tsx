import { ReactNode } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

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
