"use client";

import { useParams } from "next/navigation";
import React from "react";

const Community = () => {
    
    const params = useParams();
    const { username } = params;

    return <div>{username} Community 2910</div>;
};

export default Community;
