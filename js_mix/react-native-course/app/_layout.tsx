import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuth = false;

    useEffect(() => {
        if (!isAuth) {
            // setTimeout(() => {
                router.replace("/auth");
            // }, 100)
        }
    });

    return <>{children}</>;
}

export default function RootLayout() {
    return (
        <>
            <RouteGuard>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </RouteGuard>
        </>
    );
}
