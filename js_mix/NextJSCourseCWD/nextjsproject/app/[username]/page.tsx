"use client";

import { useParams } from "next/navigation";
import React from "react";

// localhost:3000/@pxh2910
// username = @pxh2910

const ChannelPage = () => {
    const params = useParams();
    console.log("pxh2910: params = ", params);
    const { username } = params;

    return <div>{username} ChannelPage</div>;
};

export default ChannelPage;
