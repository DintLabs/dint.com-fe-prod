import { User } from 'firebase/auth';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { store } from 'frontend/redux/store';
import Router from 'frontend/routes';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

export const globalWindow: Window &
  typeof globalThis & {
    userData?: UserDataInterface | User | undefined;
    userId?: string;
  } = window;

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
