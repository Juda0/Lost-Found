import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './findMap.css'
import { handleGetLocation } from '../../Utils/GeoLocationGrabber';
import { v4 as uuidv4 } from 'uuid';
import LostIcon from '../../../assets/LostItem.svg';
import MapLostAndFoundIcon from '../../../assets/MapLostAndFoundIcon.svg';
import {
    MDBCardImage,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

export const FindMap = ({ posts }) => {
    const [mapCenter, setMapCenter] = useState([1, 1]); // Initial center position
    const [randomKey, setRandomKey] = useState(uuidv4());

    useEffect(() => {
        handleGetLocation()
            .then((location) => {
                setMapCenter([location.latitude, location.longitude]);
                setRandomKey(uuidv4());
            })
            .catch((error) => {
                console.error('Error getting location:', error);
            })
    }, []);

    useEffect(() => {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconRetinaUrl: MapLostAndFoundIcon,

            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }, []);

    console.log(mapCenter)
    console.log(posts)
    return (
        <MapContainer center={mapCenter} key={randomKey} zoom={11} zoomControl={false} id='FindMapContainer'>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {posts && posts.map((post, index) => (
                <Marker
                    key={index}
                    position={[post.latitude, post.longitude]}
                >
                    <Popup minWidth={300} className='findPopUpContainer'>
                        <MDBCard key={index}  style={{ maxHeight: '70vh',  border: '10px solid white'}}>
                            {post.imagePath ? (
                                <MDBCardImage style={{ maxHeight: '150px', objectFit: 'cover'}} src={process.env.REACT_APP_API_BASE_URL + post.imagePath} position='top' alt='...' />
                            ) : (
                                <MDBCardImage  style={{ maxHeight: '150px', objectFit: 'cover'}} src={LostIcon} position='top' alt='...' />
                            )}
                            <MDBCardBody>
                                <MDBCardTitle>{post.title}</MDBCardTitle>
                                <MDBCardText>
                                    {post.description}
                                </MDBCardText>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <button className='mb-0'><b><NavLink to={`/posts/${post.id}/view`} className='text-decoration-none' style={{color: 'white'}}>More info</NavLink></b></button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
