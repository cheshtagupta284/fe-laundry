import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { atom, RecoilRoot } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import Login from './Containers/Login/Login';
import SignUp from './Containers/SignUp/SignUp';
import App from './Dashboard';
import Error from './Error';
import './index.css';
import reportWebVitals from './reportWebVitals';

const { persistAtom } = recoilPersist();
export const userState = atom<Record<string, string> | null>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom]
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} errorElement={<Error />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Error status={404} />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
