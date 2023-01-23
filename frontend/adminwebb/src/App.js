import React, { useState, useEffect } from 'react';
import './App.css';


import Navbar from './components/Navbar';
import Router from "./components/Routes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function App() {
  const [login, setLogin] = useState();
  const clientId = '1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com';
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            setLogin(true)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      <><Navbar /><Router /></>
    </div>
  );
}
