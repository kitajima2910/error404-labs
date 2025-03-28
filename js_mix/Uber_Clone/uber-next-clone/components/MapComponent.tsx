"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const iconUrl = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href;
const iconRetinaUrl = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href;
const shadowUrl = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href;
import { LatLngExpression } from "leaflet";
import L from "leaflet";

const customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41], // Kích thước icon
    iconAnchor: [12, 41], // Điểm neo của icon
    popupAnchor: [1, -34], // Vị trí xuất hiện của popup
    shadowSize: [41, 41] // Kích thước bóng
});

const position: LatLngExpression = [10.7769, 106.7009]; // TP.HCM

export default function MapComponent() {

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customIcon}>
                <Popup>Xin chào từ Sài Gòn!</Popup>
            </Marker>
        </MapContainer>
    );
}
