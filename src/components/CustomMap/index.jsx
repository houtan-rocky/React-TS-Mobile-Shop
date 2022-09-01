import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import React from "react";
import SearchControl from "./SearchControl";
import 'leaflet/dist/leaflet.css'

import LocationMarker from "./LocationMarker";
import { useState} from "react";
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const CustomMap = (props) => {
    const prov = new OpenStreetMapProvider();
    const [center, setCenter] = useState();

    return (
        <div dir={props.dir}>
        <MapContainer center={[35.68544030556811, 51.41376614561773]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.figikala.ir/copyright">FIGIKALA</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SearchControl
                dir={'ltr'}
                provider={prov}
                showMarker={true}
                showPopup={false}
                popupFormat={({ query, result }) => result.label}
                maxMarkers={3}
                retainZoomLevel={false}
                animateZoom={true}
                autoClose={false}
                searchLabel={"لطفا آدرس را وارد کنید"}
                keepResult={true}/>
            <LocationMarker setCenter={setCenter} setUserLocation={props.setUserBbox}/>
        </MapContainer>
        </div>
    )
}

export default CustomMap;