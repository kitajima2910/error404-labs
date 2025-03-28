"use client";

import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

// Load component ở chế độ client để tránh lỗi SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
});

const Confirm = () => {
    const [positionTager, setPositionTager] = useState<LatLngExpression | null>(null);

    // Hàm chuyển địa chỉ thành tọa độ (dùng OpenStreetMap Nominatim API)
    const getCoordinates = async (address: string) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, { headers: { "User-Agent": "Mozilla/5.0" } });
        const data = await response.json();
        console.log("Nominatim API response:", data); // Debug API response

        if (data.length > 0) {
            const { lat, lon } = data[0];
            return [parseFloat(lat), parseFloat(lon)] as LatLngExpression;
        } else {
            console.log(`Không tìm thấy địa điểm: ${address}`);
            return null;
        }
    };

    useEffect(() => {
        getCoordinates("quy nhon").then((coords) => {
            if (coords) setPositionTager(coords);
        });
    }, []);

    return (
        <Wrapper>
            <Map><MapComponent positionTager={positionTager} /></Map>
            <RideContainer>Ride Selector Confirm Button</RideContainer>
        </Wrapper>
    );
};

export default Confirm;

const Wrapper = tw.div`
    flex h-screen flex-col
`;

const RideContainer = tw.div`
    flex-1
`;

const Map = tw.div`
    flex-1
`;
