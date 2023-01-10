import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../style/Map.css'
import { Icon } from "leaflet";
import Scooter from '../images/scooter.png'
import fetching from '../models/model';
  
function Map (){
    const icon = new Icon({iconUrl: Scooter, iconSize: [15, 22], iconAnchor: [12, 41]});
    const [bikes, setBikes] = useState(false);
    useEffect(() => {
        (async () => {
            const allBikes = await fetching.bikes();
            setBikes(allBikes);
            console.log("bikes")
        })();
    }, []);
    let mapBikes = ""
    if (bikes) { 
        mapBikes = bikes.map((bike, key) => <Marker position={bike.m_location.split(', ').map((item) => parseFloat(item))} icon={icon}>
        <Popup>
        bike id: {bike.bike_id}
        </Popup>
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
  </MapContainer>
)}

export default Map;