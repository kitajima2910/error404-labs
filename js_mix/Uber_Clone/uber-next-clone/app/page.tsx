"use client";

import { useEffect } from "react";
// import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";

// Load component ở chế độ client để tránh lỗi SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
});

export default function Home() {
    useEffect(() => {
        console.log("hello");
    }, []);

    return (
        <Wrapper>
            <Map>
                <MapComponent />
            </Map>
            <ActionItems>
                {/* header */}
                <Header>
					<UberLogo src="https://cdn.worldvectorlogo.com/logos/uber-2.svg"/>
					<Profile>
						<Name>PXH 2910</Name>
						<UserLogo src="https://i.pravatar.cc/150?img=3" />
					</Profile>
				</Header>
                {/* actionbutons */}
                {/* inputbuttons */}
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
	flex justify-between items-center
`;

const UberLogo = tw.img`
	h-10
`;

const Profile = tw.div `
	flex items-center
`

const Name = tw.div `
	mr-4 w-20 text-sm font-semibold
`

const UserLogo = tw.img `
	h-12 w-12 rounded-full border border-gray-200 p-px
`
