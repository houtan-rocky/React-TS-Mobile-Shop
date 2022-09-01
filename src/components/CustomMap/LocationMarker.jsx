import {useEffect, useState} from "react";
import {Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon, LatLng} from 'leaflet'
import L from 'leaflet';


function LocationMarker(props) {

    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMapEvents({

        click(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            props.setUserLocation(e.latlng)
        },
    })




    // const map = useMap();


    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            props.setCenter(e.latlng)
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

export default LocationMarker;