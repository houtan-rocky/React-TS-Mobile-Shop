import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from "leaflet";

const SearchControl = (props) => {
    const map = useMap();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            marker: {
                icon: new Icon({iconUrl: markerIconPng,  popupAnchor: [10, -44], iconSize: [25, 41], iconAnchor: [12, 41]})
            },
            style: 'bar',
            provider: props.provider,
            ...props
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map, props]);

    return null;
};
export default SearchControl;
