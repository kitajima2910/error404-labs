"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const position: LatLngExpression = [10.7769, 106.7009]; // TP.HCM

export default function MapComponent() {

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
                <Popup>Xin chào từ Sài Gòn!</Popup>
            </Marker>
        </MapContainer>
    );
}
