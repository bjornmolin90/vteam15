import { useState, useEffect } from "react";
import "./App.css";
import fetchModel from "./models/model";
import Navbar from "./components/Navbar";
import Router from "./components/Routes";

function App() {
    let [content, setContent] = useState("");

    console.log(document.cookie);

    useEffect(() => {
        (async () => {
            let fetch = await fetchModel.fetchResult();
            setContent(fetch);
        })();
    }, []);

    return (
        <div className='App'>
            <Navbar />
            <Router />
            {content.idtest_table}
        </div>
    );
}

export default App;
