// import Login from 'frontend/pages/Login/Login';
import { ReactNode, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AdminerrorSvg from '../material/adminerr.svg';

// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type AdminAuthGuardProps = {
  children: ReactNode;
};

const adminBtnCss = {
  padding: '10px',
  borderRadius: '15px',
  backgroundColor: '#6C63FF',
  border: 'none',
  margin: '10px'
};

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isAuthenticated, isInitialized, isAdmin } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  console.log(!isAuthenticated, isInitialized, '----------', isAdmin);

  if (!isAuthenticated && isInitialized) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return (
      <>
        <img src={AdminerrorSvg} alt="" height="200px" />
        <h1>You are not Admin</h1>
        <button
          type="button"
          style={adminBtnCss}
          onClick={() => {
            navigate('/auth/login', { state: { redirectUrl: pathname } });
          }}
        >
          Login
        </button>{' '}
        <button
          type="button"
          style={adminBtnCss}
          onClick={() => {
            navigate('/');
          }}
        >
          Go Back
        </button>
      </>
    );
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <img src={AdminerrorSvg} alt="" height="200px" />
      <h1>You are not Admin</h1>
      <button
        type="button"
        style={adminBtnCss}
        onClick={() => {
          navigate('/auth/login', { state: { redirectUrl: pathname } });
        }}
      >
        Login
      </button>{' '}
      <button
        type="button"
        style={adminBtnCss}
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </button>
    </>
  );
}
