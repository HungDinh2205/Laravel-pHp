import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import routers from "./routes/routers";

import { BrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <RecoilRoot>
      <RouterProvider router={routers} />
    </RecoilRoot> */}
    <App/>
    

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
