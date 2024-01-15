import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './viewMap.css'
import MapLostAndFoundIcon from '../../../assets/MapLostAndFoundIcon.svg';

export const ViewMap = ({ center, zoom, title, description, onMarkerPositionChange }) => {

    const markerRef = useRef(null)

    console.log("center"+center)
  console.log(zoom)
    useEffect(() => {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: MapLostAndFoundIcon,
            iconUrl: MapLostAndFoundIcon,
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }, []);

    return (
        <MapContainer center={center} zoom={zoom} title={title} description={description} className='mapContainer'>
             <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
        fillColor={'#3388ff'}
      position={center}
      ref={markerRef}>
    </Marker>
        </MapContainer>
    );
};