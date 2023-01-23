import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../style/Map.css'
import { Icon } from "leaflet";
import Scooter from '../images/scooter.png'
import Parking from '../images/parking.png'
import Charging from '../images/charging.png'
import fetching from '../models/model';
  
function Map (){
    const icon = new Icon({iconUrl: Scooter, iconSize: [15, 22], iconAnchor: [7, 11]});
    const pIcon = new Icon({iconUrl: Parking, iconSize: [17, 24], iconAnchor: [8, 12]});
    const cIcon = new Icon({iconUrl: Charging, iconSize: [17, 24], iconAnchor: [8, 12]});
    const [bikes, setBikes] = useState(false);
    const [charge, setCharge] = useState(false);
    const [park, setPark] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
          console.log('This will run every second!');
          getBikes()
        }, 20000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => { 
        (async () => {
            const allCharge = await fetching.chargers();
            setCharge(allCharge);
            const allParks = await fetching.parking();
            setPark(allParks);
    })();

    }, [])
    async function getBikes() {
            const allBikes = await fetching.bikes();
            setBikes(allBikes);
        }
    let mapBikes = ""
    let mapPark = ""
    let mapCharge = ""
    if (bikes) { 
        mapBikes = bikes.map((bike, key) => <Marker position={bike.m_location.split(', ').map((item) => parseFloat(item))} icon={icon}>
        <Popup>
        bike: {bike.bike_id} <br></br> status: {bike.available_status}
        </Popup>
        </Marker>)
    }

    if (park) { 
        mapPark = park.map((park, key) => <Marker position={[park.latitude, park.longitude]} icon={pIcon}>
        </Marker>)
    }
    
    if (charge) { 
        mapCharge = charge.map((charge, key) => <Marker position={[charge.latitude, charge.longitude]} icon={cIcon}>
        </Marker>)
    }
    console.log(mapBikes)

    const queryString = window.location.search;
    const urlparam = new URLSearchParams(queryString)
    let id = urlparam.get('id')
    let cityCoords = [[55.6050, 13.0038], [57.7089, 11.9746], [59.3346, 18.0632]]
    return (
    <MapContainer center={cityCoords[id]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {mapBikes}
    {mapPark}
    {mapCharge}
  </MapContainer>
)}

export default Map;