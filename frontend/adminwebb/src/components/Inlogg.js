import React from 'react';
import {useForm} from 'react-hook-form';
import '../style/Form.css';
//install: npm install react-hook-form
let counter = 0;
function Inlogg(){
    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => 
    alert(JSON.stringify(d));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form'>
            <h2>Logga in</h2>
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
            <input type="submit" value="Logga in"/>
            </div>
        </form>
    )
}
  
export default Inlogg; 