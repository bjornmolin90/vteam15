import React, { useEffect, useState } from 'react';
import fetching from '../models/model';
//import 'bootstrap/dist/css/bootstrap.min.css';
//installera: npm install react-bootstrap bootstrap@5.1.3 bootstrap
  
function Customers(){
    const [users, setUsers] = useState(false);
    const [user, setUser] = useState({});
    const [seeRides, setSeeRides] = useState([]);
    let currentUser = 0;
    useEffect(() => {
        (async () => {
            const allUsers = await fetching.customers();
            setUsers(allUsers);
        })();
    }, []);
    
    async function deleteUser() {
        await fetching.deleteUser(user.id);
        const allUsers = await fetching.customers();
        setUsers(allUsers)
    }

    async function userInfo(event) {
        const id = event.target.value
        const fullInfo = users.filter(user => user.user_id == id);
        const rides = await fetching.rides(id);
        console.log(fullInfo)
        console.log(rides)
        setUser({
            first: fullInfo[0].firstname,
            last: fullInfo[0].lastname,
            mail: fullInfo[0].u_email,
            u_name: fullInfo[0].username,
            id: fullInfo[0].user_id,
            saldo: fullInfo[0].saldo,
            city: fullInfo[0].city,
            address: fullInfo[0].address,
            postcode: fullInfo[0].postcode

        })
        setSeeRides(rides)
        currentUser = id
        console.log(rides)
    }
    return (
        <main>
            {users instanceof Array ?
            <select
                onChange={userInfo}
            >
                <option value="-99" key="0">Användare</option>
                {users.map((user, index) => <option value={user.user_id}
                        key={index}>{user.u_email}</option>)}
            </select>
            :
            <p></p>
            }
            <div>
                <br></br>
                <p>Förnamn: <br></br><b>{user.first}</b></p>
                <p>Efternamn: <br></br><b>{user.last}</b></p>
                <p>E-mail: <br></br><b>{user.mail}</b></p>
                <p>Användarnamn: <br></br><b>{user.u_name}</b></p>
                <p>Id: <br></br><b>{user.id}</b></p>
                <p>Saldo: <br></br><b>{user.saldo}</b></p>
                <p>Stad: <br></br><b>{user.city}</b></p>
                <p>Adress: <br></br><b>{user.address}</b></p>
                <p>Postnummer: <br></br><b>{user.postcode}</b></p>
            </div>
                
            <div>
                <p><b>Tidigare resor:</b></p>
                {seeRides.map((ride, index) =>
                <div>
                <p>Starttid: {ride.start_time}</p>
                <p>Sluttid: {ride.end_time}</p>
                <p>Startposition: {ride.start_position}</p>
                <p>Slutposition: {ride.end_position}</p>
                <p>Kostnad: {ride.cost} kr</p>
                <p>Reseid: {ride.ride_id}</p>
                <p>Cykelid: {ride.bike_id}</p>
                <p>------------------------------------</p>
                </div>
                )}
            </div>
            <div>
            <button class="login-button" onClick={deleteUser}>Ta bort användare</button>
            </div>
        </main>
    )
}
export default Customers;