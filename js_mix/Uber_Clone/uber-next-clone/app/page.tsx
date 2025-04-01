"use client";

import { useEffect } from "react";
// import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";

// Load component ở chế độ client để tránh lỗi SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
});

export default function Home() {
    useEffect(() => {
        // console.log("hello");
    }, []);

    return (
        <Wrapper>
            <Map>
                <MapComponent {...{ positionPickup: null, positionTager: null }} />
            </Map>
            <ActionItems>
                {/* header */}
                <Header>
                    <UberLogo src="https://cdn.worldvectorlogo.com/logos/uber-2.svg" />
                    <Profile>
                        <Name>PXH 2910</Name>
                        <UserLogo src="https://i.pravatar.cc/150?img=3" />
                    </Profile>
                </Header>
                {/* actionbutons */}
                <ActionButtons>
                    <Link href="/search" className="contents">
                        <ActionButton>
                            <ActionButtonImage src="https://img.icons8.com/?size=100&id=111278&format=png&color=000000" />
                            Ride
                        </ActionButton>
                    </Link>
                    <ActionButton>
                        <ActionButtonImage src="https://img.icons8.com/?size=100&id=NyzA-kHQgM7k&format=png&color=000000" />
                        Wheels
                    </ActionButton>
                    <ActionButton>
                        <ActionButtonImage src="https://img.icons8.com/?size=100&id=111279&format=png&color=000000" />
                        Reserve
                    </ActionButton>
                </ActionButtons>
                {/* inputbuttons */}
                <InputButton>Where to?</InputButton>
            </ActionItems>
        </Wrapper>
    );
}

const Wrapper = tw.div`
	flex flex-col h-screen
`;

const Map = tw.div`
	flex-[.5]
`;

const ActionItems = tw.div`
	flex-[.5] p-4
`;

const Header = tw.div`
	flex justify-between items-center mb-5
`;

const UberLogo = tw.img`
	h-10
`;

const Profile = tw.div`
	flex items-center
`;

const Name = tw.div`
	mr-4 w-20 text-sm font-semibold
`;

const UserLogo = tw.img`
	h-12 w-12 rounded-full border border-gray-200 p-px
`;
const ActionButtons = tw.div`
    flex mb-8
`;

const ActionButton = tw.div`
    flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl
`;

const ActionButtonImage = tw.img`
    h-3/5
`;

const InputButton = tw.div`
    h-20 bg-gray-200 text-2xl p-4 flex items-center
`;
