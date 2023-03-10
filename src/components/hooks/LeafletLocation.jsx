import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { render } from 'react-dom';
import L from "leaflet";
import './LeafletLocation.css'
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import Config from "./../../config.json"
toast.configure()


const center = {
    lat: 46.238888, lng: -63.129166
}

// export const LeafletLocation = (props) => {
export default function LeafletLocation({ pestId, userId }) {
    const markerIcon = new L.Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [10, 45],
        popupAnchor: [0, -43]
        // iconSize: [28,45],
    })

    const [center, setCenter] = useState({ lat: 46.238888, lng: -63.129166 });

    const ZOOM_LEVEL = 10;
    const MIN_ZOOM = 8;

    const [position, setPosition] = useState(center);
    const [CoordLat, setLat] = useState(0);
    const [CoordLng, setLng] = useState(0);

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        [],
    )
    const saveLatLang = (e) => {
        e.preventDefault();
        fetch(Config.CREATE_COORDINATE, {
            method: 'POST',
            headers: { "Content-Type": 'application/json;charset=UTF-8' },
            body: JSON.stringify({
                PId: pestId,
                UId: userId,
                CoordLat: position.lat,
                CoordLng: position.lng
            })
        }).then(() => {
            toast.success('Data has been recorded', {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });

            //window.location.reload();
        })

        console.log(position.lat + " " + position.lng);
    }

    return (
        <div>

            <MapContainer center={center} zoom={ZOOM_LEVEL} minZoom={MIN_ZOOM}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={center}
                    icon={markerIcon}
                    draggable='true'
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                >
                    <Popup>
                        Drag the marker to your field location
                    </Popup>
                </Marker>
            </MapContainer>
            <button className="latlngSubmit" onClick={saveLatLang}>Submit</button>

        </div>
    )
}

//export default LeafletLocation
