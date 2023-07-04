import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AccountDetails from './components/AccountDetails';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App /> ,
  },
  {
    path:'/account',
    element:<AccountDetails/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
