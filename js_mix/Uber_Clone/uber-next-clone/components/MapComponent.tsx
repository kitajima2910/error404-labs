"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

// Tạo icon màu xanh (cho Pickup)
const greenIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Tạo icon màu đỏ (cho Tager)
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

interface MapComponentProps {
    positionPickup: LatLngExpression | null;
    positionTager: LatLngExpression | null;
}

export default function MapComponent({ positionPickup, positionTager }: MapComponentProps) {
    const [route, setRoute] = useState<LatLngExpression[]>([]);

    useEffect(() => {
        if (positionPickup && positionTager) {
            const fetchRoute = async () => {
                const url: string = `https://router.project-osrm.org/route/v1/driving/${(positionPickup as [number, number])[1]},${(positionPickup as [number, number])[0]};${(positionTager as [number, number])[1]},${(positionTager as [number, number])[0]}?overview=full&geometries=geojson`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.routes && data.routes.length > 0) {
                        const coordinates = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
                        setRoute(coordinates);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu tuyến đường:", error);
                }
            };
            fetchRoute();
        }
    }, [positionPickup, positionTager]);

    // Vị trí mặc định nếu không có positionPickup
    const defaultPosition: LatLngExpression = [10.7769, 106.7009]; // TP.HCM

    // Tạo danh sách vị trí
    const positions = [positionPickup || defaultPosition, ...(positionTager ? [positionTager] : [])];

    return (
        <MapContainer style={{ height: "100%", width: "100%" }} zoom={13} center={positionPickup || defaultPosition}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AdjustBounds positions={positions} />

            {/* Marker Pickup (Xanh) */}
            <Marker position={positionPickup || defaultPosition} icon={greenIcon}>
                <Popup>Điểm đón</Popup>
            </Marker>

            {/* Marker Tager (Đỏ) - chỉ hiển thị nếu tồn tại */}
            {positionTager && (
                <Marker position={positionTager} icon={redIcon}>
                    <Popup>Điểm đến</Popup>
                </Marker>
            )}

            {/* Vẽ tuyến đường thực tế */}
            {route.length > 0 && (
                <Polyline positions={route} color="red" weight={2} />
            )}
        </MapContainer>
    );
}
