import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = () => {
    
    const [ rideDuration, setRideDuration ] = useState(0);

    useEffect(() => {
        const duration = localStorage.getItem("distance_duration") ? JSON.parse(localStorage.getItem("distance_duration") as string).duration : 0;
        setRideDuration(duration);
    }, [rideDuration]);

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up form</Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car key={`car-${index}`}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min way</Time>
                        </CarDetails>
                        <Price>${((rideDuration * car.multiplier) / 100).toFixed(2)}</Price>
                    </Car>
                ))}
            </CarList>
        </Wrapper>
    );
};

export default RideSelector;

const Wrapper = tw.div`
    flex-1 font-weight-500 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b-1 border-gray-200
`;

const CarList = tw.div`
    overflow-y-scroll
`;

const Car = tw.div`
    flex p-4 items-center
`;

const CarImage = tw.img`
    h-14 mr-4
`;

const CarDetails = tw.div`
    flex-1
`;

const Service = tw.div`
    font-bold
`;

const Time = tw.div`
    text-xs text-blue-500
`;

const Price = tw.div`
    text-sm font-bold
`;
