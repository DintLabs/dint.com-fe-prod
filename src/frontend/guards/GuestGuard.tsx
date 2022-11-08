import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from 'frontend/redux/store';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {

  if (localStorage.getItem('apiToken') !== null) {
    return <Navigate to="/lounge" />;
  }

  return <>{children}</>;
}
