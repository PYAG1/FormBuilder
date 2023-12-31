import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "../routes/Routes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/usercontext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </React.StrictMode>,
)
