import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
});

const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();

    // useEffect(() => {
    //     async function fetchToken() {
    //         const storeToken = await AsyncStorage.getItem("token");

    //         if (storeToken) {
    //             setAuthToken(storeToken);
    //         }
    //     }
    //     fetchToken();
    // }, []);

    const authenticate = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    };

    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem("token");
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
