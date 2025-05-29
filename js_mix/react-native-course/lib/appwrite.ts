import { Account, Client, ID } from "react-native-appwrite";

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);

export const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
};

export const register = async (email: string, password: string, name: string) => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
    return await account.get();
};

export const isUserLoggedIn = async () => {
    try {
        await account.get();
        return true;
    } catch (error) {
        return false;
    }
};
