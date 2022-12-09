import { useState, useEffect } from 'react';
import './App.css';
import fetchModel from './models/model';

function App() {
  let [content, setContent] = useState("")
  
  useEffect(() => {
    (async () => {
      let fetch = await fetchModel.fetchResult()
      setContent(fetch)
        
    })();
  }, []);

    return (
      <div className="App">
          {content.idtest_table}
        
      </div>
    );
  }

  export default App;
  
