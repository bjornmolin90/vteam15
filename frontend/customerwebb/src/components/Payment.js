/* import React from 'react';
 */
import React, { useEffect, useState } from "react";
import "../style/Payment.css";
import fetching from "../models/model";

function Payment() {
    const [payMonthly, setPayMonthly] = useState(false);
    async function monthlyPayment() {
        event.preventDefault();
        const data = {
            monthlyPayment: payMonthly,
        };
        const res = await fetching.monthlyPayment(data);
    }
    function onOffSwitchToggle(event) {
        event.preventDefault();

        setPayMonthly((prevVal) => !prevVal);
    }
    const onOffStyle = {
        transform: payMonthly ? "translate(130%, -8%)" : "translate(0%, -8%)",
    };

    return (
        <main>
            <form className='form--non--manual'>
                <div className='payment'>
                    <h2>Betala månadsvis</h2>
                    <h5>Hur vill du betala? </h5>
                    <div className='paymentMethods'>
                        <label className='label'>
                            <input className='input' type='checkbox' />
                            Klarna
                        </label>
                        <br></br>
                        <label className='label'>
                            <input className='input' type='checkbox' />
                            PayPal
                        </label>
                    </div>
                </div>
                <h5>Betala Månadsvis</h5>
                <div className='onOffSwitch'>
                    <div className='onOffBackground' onClick={onOffSwitchToggle}>
                        <div className='onOffCircle' style={onOffStyle}></div>
                    </div>
                </div>
                <button type='submit' className='checkButton' onClick={monthlyPayment}>
                    Bekräfta och betala
                </button>
            </form>

            <h5>eller</h5>
            <div className='goback'>
                <p className='monPay'>
                    {" "}
                    <a href='http://localhost:1340/account'>Betala manuellt</a>
                </p>
            </div>
        </main>
    );
}
//test git

export default Payment;
