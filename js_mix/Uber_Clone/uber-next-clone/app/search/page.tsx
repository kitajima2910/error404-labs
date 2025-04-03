"use client";

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";

const Search = () => {

    const [ pickup, setPickup ] = useState("");
    const [ target, setTarget ] = useState("");

    return (
        <Wrapper>
            {/* button container */}
            <ButtonContainer>
                <Link href="/" className="table-cell">
                    <BackButton src="https://img.icons8.com/?size=100&id=7811&format=png&color=000000" />
                </Link>
            </ButtonContainer>
            {/* input container */}
            <InputContainer>
                <FromToIcons>
                    <Circle src="https://img.icons8.com/?size=100&id=86789&format=png&color=000000" />
                    <Line src="https://img.icons8.com/?size=100&id=120588&format=png&color=000000" />
                    <Circle src="https://img.icons8.com/?size=100&id=JYRTmcgc4aTi&format=png&color=000000" />
                </FromToIcons>
                <InputBoxes>
                    <Input placeholder="Enter pickup location" value={pickup} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPickup(e.target.value)} />
                    <Input placeholder="Where to?" value={target} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(e.target.value)} />
                </InputBoxes>
                <PlusIcon src="https://img.icons8.com/?size=100&id=SpuYztywr0Vl&format=png&color=000000" />
            </InputContainer>
            {/* saved places */}
            <SavedPlaces>
                <StarIcon src="https://img.icons8.com/?size=100&id=104&format=png&color=000000" />
                Saved Places
            </SavedPlaces>
            <ConfirmLocation>
                <Link href={{
                    pathname: "/confirm",
                    query: {
                        pickup: pickup,
                        target: target,
                    }
                }}>
                    <Button>Confirm Locations</Button>
                </Link>
            </ConfirmLocation>

            {/* confirm localtion */}
        </Wrapper>
    );
};

export default Search;

const Wrapper = tw.div`
    bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
    bg-white px-4
`;

const BackButton = tw.img`
    h-12
`;
const InputContainer = tw.div`
    bg-white flex items-center px-4 mb-2
`;

const FromToIcons = tw.div`
    w-10 flex flex-col mr-2 items-center
`;

const Circle = tw.img`
    h-2.5
`;

const Line = tw.img`
    h-10
`;
const InputBoxes = tw.div`
    flex flex-col flex-1
`;

const Input = tw.input`
    h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`;

const PlusIcon = tw.img`
    w-10 h-10 ml-3
`;

const SavedPlaces = tw.div`
    flex bg-white items-center px-4 py-2 font-semibold text-sm
`;

const StarIcon = tw.img`
    w-10 h-10 p-2 mr-2
`;

const ConfirmLocation = tw.div`
    bg-gray-200 px-4 py-2 cursor-pointer
`;

const Button = tw.button`
    bg-black w-full py-2 text-white text-center text-sm font-semibold
`;
