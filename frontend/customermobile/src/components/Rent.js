// import React from 'react';
import React, { useEffect, useState } from 'react';
import fetching from '../models/model';

function Rent(){
    const [data, setData] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [data2, setData2] = useState([]);
    const [bikeId, setBikeId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [startLocation, setStartLocation] = useState('');

    useEffect(() => {
        (async () => {
            const allBikes = await fetching.bikes();
            setData(allBikes);
        })();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            (async () => {
                const allBikes = await fetching.bikes(selectedCity);
                setData2(allBikes);
            })();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (data2.length) {
            setFilteredBikes(data2.filter((bike) => bike.city === selectedCity));
        }
    }, [data2, selectedCity]);

    const handleCity = (event) => {
        setSelectedCity(event.target.value);
    };

    const startBikeRide = (event) => {
        setBikeId(event.target.value);
        console.log(event.target.value);
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({ bike_id: event.target.value})
        };
        fetch('http://localhost:1337/api/v01/bikeride', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data); setStartTime(data.startTime); setStartLocation(data.startLocation)})
        .catch(error => console.error(error));
    };

    const endBikeRide = (event) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ bike_id: event.target.value, startTime: startTime, startLocation: startLocation }),
        };
        fetch('http://localhost:1337/api/v01/bikeride/stop', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Cykelsida</h1>
            <label htmlFor='city-select'>Välj stad: </label>
            <select id='city-select' onChange={handleCity}>
                <option value=''>Välj stad</option>
                <option value='Goteborg'>Göteborg</option>
                <option value='Malmo'>Malmö</option>
                <option value='Stockholm'>Stockholm</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Cykel ID</th>
                        <th>Parkering</th>
                        <th>Tillgänglighet</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBikes instanceof Array ? filteredBikes.map((bike, key) =>
                        <tr key={key}>
                            <td>{bike.city}</td>
                            <td>{bike.bike_id}</td>
                            <td>{bike.parking}</td>
                            <td>{bike.available_status}</td>
                            <td><button value={bike.bike_id} onClick={(event) => startBikeRide(event)}>Hyr</button></td>
                            <td><button value={bike.bike_id} onClick={(event) => endBikeRide(event)}>Avsluta</button></td>
                        </tr>)
                        :
                    <p></p>
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Rent;
