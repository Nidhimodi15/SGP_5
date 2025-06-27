import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1049761690648-j4f0iotno6epi3etm1v7u4s3q67loc6b.apps.googleusercontent.com" >  
    <App />
  </GoogleOAuthProvider>

)
