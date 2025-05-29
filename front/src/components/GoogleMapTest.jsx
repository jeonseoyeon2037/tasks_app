import React, { useEffect, useState } from 'react';

import { LoadScriptNext, GoogleMap, Marker } from '@react-google-maps/api';

// import locations from '../../constants/world-50m.v1.json';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 37.5665,
    lng: 126.9780
};

const GoogleMapTest = () => {
    const [locations, setLocations] = useState([]);
/*
    useEffect(() => {
        fetch('/locations.json')
            .then(res => res.json())
            .then(data => setLocations(data.records))
    }, []);
    */
    
    return (
        <LoadScriptNext googleMapApiKey={import.meta.env.VITE_AUTH_CLIENT_ID}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                {/* {locations.map(loc => (
                    <Marker
                        key={loc.id}
                        position={{ lat: loc.lat, lng: loc.lng }}
                        label={loc.label}
                    />
                ))} */}
                <Marker position={center} />
            </GoogleMap>
        </LoadScriptNext>
    )
}

export default GoogleMapTest;