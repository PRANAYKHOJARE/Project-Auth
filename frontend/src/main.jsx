import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="646067184302-4es8p6a5q0p9j73n5sjfi82ab70pk08q.apps.googleusercontent.com">

    <App />

  </GoogleOAuthProvider>
)
