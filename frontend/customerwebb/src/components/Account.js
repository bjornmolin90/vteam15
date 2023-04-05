import React, { useEffect, useState } from "react";
import fetching from "../models/model";
import "../style/Account.css";

function Account() {
    const [bikeRides, setBikeRides] = useState({});
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const [depositAmount, setDepositAmount] = useState(0);
    const [combinedAmount, setCombinedAmount] = useState(0);

    useEffect(() => {
        (async () => {
            const myUser = await fetching.customers();
            setUser(myUser);
            const bikeRide = await fetching.bikeRides();
            setBikeRides(bikeRide);
        })();
    }, []);

    useEffect(() => {
        if (!account.length) {
            return;
        }

        setCombinedAmount(() => Number(account[0].balance) + depositAmount);
    }, [account, depositAmount]);

    useEffect(() => {
        userInfo();
        (async () => {
            const account = await fetching.accounts();
            if (account.length == 0) {
                return;
            }
            setAccount(account);
        })();
    }, [user]);

    async function userInfo() {
        if (user == false) {
            return;
        }
        const fullInfo = user;
        if (!fullInfo[0]) {
            return;
        }
        setUser({
            first: fullInfo[0].firstname,
            last: fullInfo[0].lastname,
            mail: fullInfo[0].u_email,
            u_name: fullInfo[0].username,
            id: 1,
            saldo: fullInfo[0].saldo,
            city: fullInfo[0].city,
            address: fullInfo[0].address,
            postcode: fullInfo[0].postcode,
        });
    }

    async function addCardToAccount(event) {
        event.preventDefault();

        let cardnum = event.target[0].value;
        let csv = event.target[2].value;
        let data = {
            account: {
                card_number: cardnum,
                csv: csv,
            },
        };

        (async () => {
            const account = await fetching.accounts();
            if (account.length != 0) {
                return;
            }
            const res = await fetching.addAccount(data);
            setAccount(res);
        })();
    }

    async function addBalanceToAccount(event) {
        event.preventDefault();
        let data = {
            balance: depositAmount,
        };
        (async () => {
            const res = await fetching.addBalanceToAccount(data);
            if (res == 200) {
                const account = await fetching.accounts();
                setDepositAmount(() => 0);
                if (account.length == 0) {
                    return;
                }
                setAccount(account);
            }
        })();
    }

    function addBalance(event) {
        event.preventDefault();

        let addedBalance = event.target[0].value;
        setDepositAmount((prevAmount) => prevAmount + Number(addedBalance));
    }

    function handleClick(){
        fetching.payNow();
        location.reload();
    }
    return (
        <main>
            <div onLoad={userInfo} className='check-balance'>
               
                {bikeRides.status == "unpaid" ? <> <h2>Att betala:</h2><h5> {bikeRides.totalcost} Kr</h5><button onClick={handleClick} className='paymentButton'>
                    Betala
                </button></> : ""}
                <br></br>
            </div>
            <div onLoad={userInfo} className='check-balance'>
                <h2>Nuvarande saldo för detta konto: </h2>
                {account.length > 0 && <h5>{Number(account[0].balance)} Kr</h5>}
                <br></br>
            </div>
            <div onLoad={userInfo} className='check-balance'>
                <h2>Saldo efter påfyllning: </h2>
                {account.length > 0 && <h5>{Number(combinedAmount)} Kr</h5>}
                <br></br>
            </div>
            <div className='forms'>
                <form className='form--manual' onSubmit={addBalance}>
                    <div className='add-balance'>
                        <h4>Fyll på saldo </h4>
                    </div>
                    <div className='saldo--form--div'>
                        <p className='balance'>Belopp att lägga till:</p>
                        <input type='number' name='' id='' placeholder='SEK' />
                        <button type='submit' className='paymentButton'>
                            Lägg till belopp
                        </button>
                    </div>
                </form>
                <form className='form--manual' onSubmit={addCardToAccount}>
                    <h4>Välj betalningsmetod</h4>
                    <p className='pay'>Kortbetalning</p>
                    <h3>Ange dina kortuppgifter</h3>
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
                    <button type='submit' className='cardButton'>
                        Lägg till ett kontokort
                    </button>
                    <h5>eller</h5>
                    <div className='goback'>
                        <p className='monPay'>
                            {" "}
                            <a href='http://localhost:1340/payment'>Betala månadsvis</a>
                        </p>
                    </div>
                </form>
            </div>
            <form className='form--manual' onSubmit={addBalanceToAccount}>
                <button type='submit' className='submitButton'>
                    Bekräfta insättning
                </button>
            </form>
        </main>
    );
}
//test git
export default Account;
