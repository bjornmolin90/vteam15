//sida där kunden kan fylla på med pengar till sitt konto (prepaid), eller låta systemet dra pengar varje månad via en betalningstjänst
//Det finns två olika sätt att betala på.
//Automatisk betalning med en betaltjänst varje månad. Detta kräver en sida där man väljer vilket betalningssätt man vill använda, antingen genom betaltjänsten eller genom manuell betalning.
//Manuell insättning på användarkontot och sedan betalning med ett klick. Detta kräver två sidor, en för insättning och en för betalning.
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetching from "../models/model";
import "../style/Account.css";

function Account() {
    const [users, setAccount] = useState(false);
    useEffect(() => {
        (async () => {
            const allAccounts = await fetching.customers();
            console.log(allAccounts);
            setAccount(allAccounts);
        })();
    }, []);
    const deposit = (e) => {
        e.preventDefault();
    };
    return (
        <main>
            {users instanceof Array ? (
                users.map((user, key) => <p key={user.user_id}>{user.username}</p>)
            ) : (
                <>
                    <div className='check-balance'>
                        <h3>Saldo för detta konto: </h3>
                        <p>500kr</p>
                        <br></br>
                    </div>
                    <form className='form--manual'>
                        <h4>Fyll på saldo </h4>
                        <div className='saldo form--div'>
                            <p>Belopp att lägga till:</p>
                            <input type='number' name='' id='' placeholder='SEK' />
                        </div>
                        <h4>Välj betalningsmetod</h4>
                        <h5>Betala med kort</h5>
                        <div className='card form--div'>
                            <p>Kortnummer</p>
                            <input type='number' name='cardNum' id='cardNum' placeholder='1234 5678 9012 3456' />
                        </div>
                        <div className='doublediv form--div'>
                            <div className='expire form--div'>
                                <p>Utgångsdatum</p>
                                <input type='text' name='' id='' placeholder='MM/ÅÅ' />
                            </div>
                            <div className='cvc form--div'>
                                <p>CVC/CVV</p>
                                <input type='number' name='' id='' placeholder='3 siffror' />
                            </div>
                        </div>
                        <div className='name form--div'>
                            <p>Namn på kort</p>
                            <input type='text' placeholder='A. Anderssons' />
                        </div>
                    </form>
                    <button type='submit' className='submitButton'>
                        Bekräfta och betala
                    </button>
                </>
            )}
        </main>
    );
}
export default Account;
