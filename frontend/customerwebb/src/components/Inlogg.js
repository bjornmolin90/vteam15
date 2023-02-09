import React from "react";
import { useForm } from "react-hook-form";
import "../style/Form.css";
//install: npm install react-hook-form

function Inlogg() {
    return (
        <div className='box-content'>
            <div className='form'>
                <h2>Logga in på ditt konto</h2>
                <button type='submit' className='loginButton'>
                    Logga in med Google
                </button>
            </div>
            <p>
                Har du inget konto?<a href='http://localhost:1340/registera'> Registera dig</a>
            </p>
        </div>
    );
}

export default Inlogg;
