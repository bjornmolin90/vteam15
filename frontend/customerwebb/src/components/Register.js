import React from "react";
import { useForm } from "react-hook-form";
import "../style/Form.css";

//installera: npm install react-hook-form
let counter = 0;
function Inlogg() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));
    return (
        <form className='form-content' Submit={handleSubmit(onSubmit)}>
            <div className='form'>
                <h2>Skapa ett konto</h2>
                <div className='form-label'>
                    <label>
                        <input placeholder='E-post' {...register("e-post")} />
                    </label>
                </div>
                <div className='form-label'>
                    <br></br>
                    <label>
                        <input placeholder='Lösenord' {...register("password")} />
                    </label>
                </div>
                {/*                <p>
                    <span>{counter++}</span>
                </p> */}
                <button type='submit' className='registerButton'>
                    Registrera dig
                </button>
            </div>
            <br></br>
            <div className='account-check'>
                <p>
                    Har du ett konto?<a href='http://localhost:1340/inlogg'> Logga in</a>
                </p>
            </div>
        </form>
    );
}

export default Inlogg;
