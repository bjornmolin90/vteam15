import React, { useEffect, useState } from 'react';
import fetching from '../models/model';
//import 'bootstrap/dist/css/bootstrap.min.css';
//installera: npm install react-bootstrap bootstrap@5.1.3 bootstrap
  
function Customers(){
    const [users, setUsers] = useState(false);
    useEffect(() => {
        (async () => {
            const allUsers = await fetching.customers();
            setUsers(allUsers);
        })();
    }, []);
    return (
        <main>
        {
        users instanceof Array ? users.map((user, key) => <p key={user.user_id}>{user.username}</p>)
            :
        <p>""</p>
        }
        </main>
    )
}
export default Customers;