import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isLoadingUser } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        const inAuthGroup = segments[0] === "auth";

        if (!user && !inAuthGroup && !isLoadingUser) {
            setTimeout(() => {
                router.replace("/auth");
            }, 100);
        } else if (user && inAuthGroup && !isLoadingUser) {
            setTimeout(() => {
                router.replace("/");
            }, 100);
        }
    }, [user, segments]);

    return <>{children}</>;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <PaperProvider>
                <SafeAreaProvider>
                    <RouteGuard>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        </Stack>
                    </RouteGuard>
                </SafeAreaProvider>
            </PaperProvider>
        </AuthProvider>
    );
}
