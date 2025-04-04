"use client";

import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app, provider, auth } from "../../firebase";
import { useRouter } from "next/navigation";


const Login = () => {

    const router = useRouter();
    
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push("/");
            }
        });
    }, []);
    
    return (
        <Wrapper>
            <UberLogo src="https://cdn.worldvectorlogo.com/logos/uber-2.svg" />
            <Title>Đăng nhập vào tài khoản của bạn</Title>
            <HeadImage src="https://static.vecteezy.com/system/resources/thumbnails/021/666/130/small_2x/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-sign-in-to-account-user-authorization-login-authentication-page-concept-png.png" />
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>Đăng nhập với Google</SignInButton>
        </Wrapper>
    );
};

export default Login;

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`;

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full cursor-pointer font-semibold
`;

const UberLogo = tw.img`
    h-10 w-auto object-contain self-start
`;

const Title = tw.div`
    text-xl pt-4 text-gray-500
`;

const HeadImage = tw.img`
    object-contain w-full
`;
