import { useState, useEffect } from 'react';
import './App.css';
import fetchModel from './models/model';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

function App() {
  let [content, setContent] = useState("")
  const clientId = '1065073167702-jdtotil3acn7693leg7tsl4fs66p8cba.apps.googleusercontent.com';
  
  useEffect(() => {
    (async () => {
      let fetch = await fetchModel.fetchResult()
      setContent(fetch)
        
    })();
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: ''
    });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

    return (
      <div className="App">
          {content.idtest_table}
          <p>test</p>
          <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    );
  }

  export default App;
  
