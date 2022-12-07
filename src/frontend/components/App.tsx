import { User } from 'firebase/auth';
import _axios from 'frontend/api/axios';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { store } from 'frontend/redux/store';
import Router from 'frontend/routes';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

export const globalWindow: Window &
  typeof globalThis & {
    userData?: UserDataInterface | User | undefined;
    userId?: string;
  } = window;

function App() {
  useEffect(() => {
    const handleTabClose = async (event: any) => {
      alert("close");
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
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
