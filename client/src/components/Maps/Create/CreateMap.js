import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './createMap.css'

export const CreateMap = ({ center, zoom, title, description, onMarkerPositionChange }) => {

    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              const newPosition = marker.getLatLng();
              setPosition(newPosition);
              if (onMarkerPositionChange) {
                onMarkerPositionChange(newPosition);
              }
            }
          },
        }),
        [onMarkerPositionChange],
      );

  console.log("center"+center)
  console.log(zoom)
    useEffect(() => {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }, []);

    return (
        <MapContainer center={center} zoom={zoom} title={title} description={description} className='mapContainer'>
             <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <b>{title}</b> <br /> {description} <br />

      </Popup>
    </Marker>
        </MapContainer>
    );
};