import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const signupHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            await createUser(email, password);
        } catch (error) {
            Alert.alert("Signup failed", "Could not create user. Please check your credentials or try again later.");
        }
        setIsAuthenticating(false);
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
