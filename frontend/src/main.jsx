import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import {Hero, Pay} from './components/components.index.js'
import {SignUp, SignIn, Update} from './pages/pages.index.js'



const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/pay",
        element: <Pay />
      },
      {
        path: "/update",
        element: <Update />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
   <RouterProvider router={router} />
  </React.StrictMode>,
)
