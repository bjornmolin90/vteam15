import { useState, useEffect } from 'react';
import './App.css';
import fetchModel from './models/model';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  let [content, setContent] = useState("")
  const clientId = '1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com';
  useEffect(() => {
    (async () => {
      let fetch = await fetchModel.fetchResult()
      setContent(fetch)
        
    })();
  }, []);

    return (
      <div className="App">
          {content.idtest_table}
          <p>test</p>
          <GoogleOAuthProvider clientId="1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
      </div>
    );
  }

  export default App;
  