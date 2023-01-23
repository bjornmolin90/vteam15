import { useState, useEffect } from 'react';
import './App.css';
import fetchModel from './models/model';
import Navbar from './components/Navbar';
import Router from "./components/Routes";
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  let [content, setContent] = useState("")
  
  useEffect(() => {
    (async () => {
      let fetch = await fetchModel.fetchResult()
      setContent(fetch)
        
    })();
  }, []);

  const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
      window.location.href = '/auth/google';
    };
    if (isLoggedIn) {
      return <Redirect to='/' />;
    }
  
    return (
      <div>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    );
  }

  const [ profile, setProfile ] = useState([]);
  const onSuccess = (res) => {
    setProfile(res.profileObj);
  };

  const onFailure = (res) => {
      console.log('Login failed', res);
  };

    return (
      <div className="App">
           <Navbar />
        <Router />
          {content.idtest_table}
        {Login}
        <GoogleLogin
          clientId='1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com'
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              shape="circle"
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
          />
      </div>
    );
  }

  export default App;
  