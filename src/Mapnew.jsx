import { React, createElement, useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./ui/Mapnew.css";

const Mapnew = props => {
    const [map, setMap] = useState(null);

    //when the list of locations is changed, the map boudaries are automatically adjusted to show all locations
    useEffect(() => {
        if (map && props.locations.status && parsedLocations.length > 0 === "available") {
            const bounds = new window.google.maps.LatLngBounds();
            parsedLocations.forEach(location => {
                bounds.extend({ lat: location.lat, lng: location.lng });
            });
            map.fitBounds(bounds);
            setMap(map);
        }
    }, [map]);

    //when first loading the map, the map boundaries are adjusted to show all locations
    const onLoad = map => {
        if (map && props.locations.status === "available" && parsedLocations.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            parsedLocations.forEach(location => {
                bounds.extend({ lat: location.lat, lng: location.lng });
            });
            map.fitBounds(bounds);
            setMap(map);
        }
    };

    const onUnmount = useCallback(map => {
        setMap(null);
    }, []);

    //we don't render until we have loaded all locations
    if (props.locations.status !== "available") {
        return;
    }

    const containerStyle = {
        width: parseInt(props.width),
        height: parseInt(props.height)
    };

    const defaultCenter = {
        lat: parseFloat(props.defaultLat),
        lng: parseFloat(props.defaultLng)
    };

    //this makes it easier to read access data from the various location attributes
    const parsedLocations = props.locations.items.map(location => {
        return {
            lat: parseFloat(props.lat(location).value),
            lng: parseFloat(props.lng(location).value),
            markerWidth: parseFloat(props.markerWidth(location).value),
            markerHeight: parseFloat(props.markerHeight(location).value),
            svg: props.svg(location).value
        };
    });

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={{
                    styles: JSON.parse(props.JsonMapStyle),
                    disableDefaultUICenter: true,
                    zoomControl: true
                }}
                center={defaultCenter}
                onLoad={onLoad}
                onUnmount={onUnmount}
                zoom={10}
            >
                {parsedLocations.map(location => {
                    return (
                        <Marker
                            key={location.id}
                            position={{
                                lat: location.lat,
                                lng: location.lng
                            }}
                            icon={{
                                url: "data:image/svg+xml;charset=UTF-8;base64," + btoa(location.svg),
                                scaledSize: new window.google.maps.Size(
                                    location.markerWidth || 50,
                                    location.markerHeight || 50
                                ),
                                anchor: new window.google.maps.Point(50, 50)
                            }}
                        />
                    );
                })}
            </GoogleMap>
        </div>
    );
};

export default Mapnew;
