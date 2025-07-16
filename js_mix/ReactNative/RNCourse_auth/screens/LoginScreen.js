import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    const loginHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert("Login failed", "Could not log you in. Please check your credentials or try again later.");
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
