import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "../routes/Routes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './context/usercontext'
import { FormsProvider } from './context/formcontext'
import { BuilderProvider } from './context/designerContext'

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
<BuilderProvider>
<FormsProvider>
<AuthProvider>
<LocalizationProvider dateAdapter={AdapterDayjs}>
     <RouterProvider router={router} />
     </LocalizationProvider>
     </AuthProvider>
     </FormsProvider>
     </BuilderProvider>
  </React.StrictMode>
  
  
)
