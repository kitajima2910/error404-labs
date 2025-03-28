"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

// let position1: LatLngExpression = [10.7769, 106.7009]; // TP.HCM
// let position2: LatLngExpression | null = null; // Có thể là null
// position2 = [10.8099244, 106.5709155]; // Bình Chánh (có thể null)

// Tạo icon màu xanh (cho position1)
const greenIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Tạo icon màu đỏ (cho position2)
const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component tự động zoom nếu có nhiều marker
function AdjustBounds({ positions }: { positions: LatLngExpression[] }) {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 1) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else {
            map.setView(positions[0], 13); // Nếu chỉ có 1 vị trí, set center về đó
        }
    }, [map, positions]);

    return null;
}

export default function MapComponent({ positionTager }: { positionTager: LatLngExpression | null }) {
    let position1: LatLngExpression = [10.7769, 106.7009]; // TP.HCM
    // let position2: LatLngExpression | null = null; // Có thể là null
    // position2 = [10.8099244, 106.5709155]; // Bình Chánh (có thể null)
    let position2 = positionTager; // Bình Chánh (có thể null)

    // Tạo danh sách vị trí (nếu position2 có giá trị thì thêm vào)
    const positions = [position1, ...(position2 ? [position2] : [])];

    return (
        <MapContainer
            style={{ height: "100%", width: "100%" }}
            zoom={13}
            center={position1} // Mặc định center vào position1
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AdjustBounds positions={positions} />

            {/* Marker position1 (xanh) */}
            <Marker position={position1} icon={greenIcon}>
                <Popup>Xin chào từ Sài Gòn!</Popup>
            </Marker>

            {/* Marker position2 (đỏ) - chỉ hiển thị nếu tồn tại */}
            {position2 && (
                <Marker position={position2} icon={redIcon}>
                    <Popup>Xin chào từ Bình Chánh!</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}
