"use client";

import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { useSearchParams } from "next/navigation";
import RideSelector from "@/components/RideSelector";
import Link from "next/link";

// Load component ở chế độ client để tránh lỗi SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
});

const Confirm = () => {
    const [positionPickup, setPositionPickup] = useState<LatLngExpression | null>(null);
    const [positionTager, setPositionTager] = useState<LatLngExpression | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const pickup = searchParams.get("pickup");
    const target = searchParams.get("target");

    // console.log(pickup, target);

    // Hàm chuyển địa chỉ thành tọa độ (dùng OpenStreetMap Nominatim API)
    const getCoordinates = async (address: string) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, { headers: { "User-Agent": "Mozilla/5.0" } });
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            return [parseFloat(lat), parseFloat(lon)] as LatLngExpression;
        } else {
            console.log(`Không tìm thấy địa điểm: ${address}`);
            return null;
        }
    };

    useEffect(() => {
        Promise.all([getCoordinates(pickup as string).then(setPositionPickup), getCoordinates(target as string).then(setPositionTager)]).then(() => setIsLoading(false));
    }, []);

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/?size=100&id=7811&format=png&color=000000" />
                </Link>
            </ButtonContainer>
            <Map className={`${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}>{!isLoading && <MapComponent {...{ positionPickup, positionTager }} />}</Map>
            <RideContainer>
                <RideSelector />
                <ConfirmButtonContainer>
                    <ConfirmButton>Confirm UberX</ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    );
};

export default Confirm;

const Wrapper = tw.div`
    flex h-screen flex-col
`;

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`;

const Map = tw.div`
    flex-1
    transition-opacity duration-500 h-1/2
`;

const ConfirmButtonContainer = tw.div`
    border-t-1 border-gray-200
`;

const ConfirmButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center text-sm font-bold
`;

const ButtonContainer = tw.div`
    rounded-full absolute top-4 right-4 z-1000 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
    h-12 object-contain
`;
