import React from 'react';
import {useForm} from 'react-hook-form';
import '../style/Form.css';


//installera: npm install react-hook-form
let counter = 0;
function Register(){
    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => 
    alert(JSON.stringify(d));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form'>
            <h2>Registera dig</h2>
            <label>
                E-post:
                <input {...register("firstName")}/>
            </label>
            <br></br>
            <label>
                Lösenord:
                <input {...register("lastName")}/>
            </label>
            <p>Render: <span>{counter++}</span></p>
            <input type="submit" value="Registera dig"/>
            </div>
        </form>
    )
}
  
export default Register; 