import React from "react";
import { useForm } from "react-hook-form";
import "../style/Form.css";

//installera: npm install react-hook-form
let counter = 0;
function Inlogg() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form'>
                <h2>Registera dig</h2>
                <div className='form-label'>
                    <label>
                        <p>E-post:</p>
                        <input placeholder='E-post' {...register("e-post")} />
                    </label>
                </div>
                <div className='form-label'>
                    <br></br>
                    <label>
                        <p>Lösenord:</p>
                        <input placeholder='Lösenord' {...register("password")} />
                    </label>
                </div>
                <p>
                    <span>{counter++}</span>
                </p>
                <button type='submit' className='loginButton'>
                    Registera dig
                </button>
            </div>
        </form>
    );
}

export default Inlogg;
