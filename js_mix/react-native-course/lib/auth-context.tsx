import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);


    useEffect(() => {
        getUser()
    }, [])


    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session)
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoadingUser(false)
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            await signIn(email, password);
            return null
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }

            return "Đã xảy ra lỗi trong quá trình đăng ký"
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const session = await account.get()
            setUser(session)
            return null
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }

            return "Đã xảy ra lỗi trong quá trình đăng nhập"
        }
    }

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            
        }
    };

    return <AuthContext.Provider value={{ user, isLoadingUser, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};
