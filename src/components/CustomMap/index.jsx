import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

import LocationMarker from "./LocationMarker";
import {useEffect, useState} from "react";



const CustomMap = (props) => {

    const [center, setCenter] = useState();


    return (
        <MapContainer center={[35.68544030556811, 51.41376614561773]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setCenter={setCenter} setUserLocation={props.setUserBbox}/>
        </MapContainer>
    )
}

export default CustomMap;