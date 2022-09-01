import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const SearchControl = (props) => {
    const map = useMap();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
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
