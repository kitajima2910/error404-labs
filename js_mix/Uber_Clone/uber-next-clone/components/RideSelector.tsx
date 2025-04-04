import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = () => {
    const [rideDuration, setRideDuration] = useState(0);

    useEffect(() => {
        const storedDuration = localStorage.getItem("distance_duration");
        if (storedDuration) {
            const parsedDuration = JSON.parse(storedDuration).duration;
            setRideDuration(parsedDuration);
        }
    }, []); // Chạy 1 lần khi component mount

    return (
        <Wrapper>
            <Title>Chọn chuyến đi hoặc vuốt lên biểu mẫu</Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car key={`car-${index}`}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{((rideDuration * car.multiplier) / 60).toFixed(2)} phút đến</Time>
                        </CarDetails>
                        <Price>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            }).format((rideDuration * car.multiplier * 25970 * 0.7) / 100)}
                        </Price>
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
