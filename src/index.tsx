import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { LoungeProvider } from 'frontend/contexts/LoungeContext';

import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'frontend/contexts/FirebaseContext';
import App from './frontend/components/App';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from './frontend/contexts/ThemeContext'

const rootElement = document.getElementById('root');
render(
  <HelmetProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <AuthProvider>
      <LoungeProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LoungeProvider>
    </AuthProvider>
  </HelmetProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
