import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import './index.css';
import App from './Dashboard';
import Error from './Error';
import Login from './Containers/Login/Login';
import reportWebVitals from './reportWebVitals';
import SignUp from './Containers/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/dashboard',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const userState = atom<Record<string, string> | null>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
