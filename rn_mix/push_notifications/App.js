import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            handleRegistrationError("Permission not granted to get push token for push notification!");
            return;
        }
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError("Project ID not found");
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError("Must use physical device for push notifications");
    }
}

export default function App() {
    // useEffect(() => {
    //     const configurePushNotifications = async () => {
    //         const { status } = await Notifications.getPermissionsAsync();
    //         let finalStatus = status;
    //         if (finalStatus !== "granted") {
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== "granted") {
    //             Alert.alert("Permission required", "Push notifications are required to use this app");
    //             return;
    //         }
    //         const pushTokenData = await Notifications.getExpoPushTokenAsync();
    //         console.log("pxh_2910 ============================== ");
    //         console.log("pxh_2910: ", pushTokenData);
    //         console.log("pxh_2910 ============================== ");
    //     };
    //     if (Platform.OS === "android") {
    //         Notifications.setNotificationChannelAsync("default", {
    //             name: "default",
    //             importance: Notifications.AndroidImportance.DEFAULT,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: "#FF231F7C",
    //         });
    //     }
    //     configurePushNotifications();
    // }, []);
    // useEffect(() => {
    //     const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
    //         console.log("Notification received 1232910");
    //         console.log(notification);
    //         const userName = notification.request.content.data.userName;
    //         console.log(userName);
    //     });
    //     const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
    //         console.log("Notification response received 123");
    //         console.log(response);
    //         const userName = response.notification.request.content.data.userName;
    //         console.log(userName);
    //     });
    //     return () => {
    //         subscription1.remove();
    //         subscription2.remove();
    //     };
    // }, []);
    // const scheduleNotification = () => {
    //     Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "My first local notification",
    //             body: "This is my first local notification",
    //             data: {
    //                 userName: "pxh2910",
    //             },
    //         },
    //         trigger: {
    //             seconds: 5,
    //         },
    //     });
    // };

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(undefined);

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => setExpoPushToken(token ?? ""))
            .catch((error) => setExpoPushToken(`${error}`));

        const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    // return (
    //     <View style={styles.container}>
    //         <Button title="Schedule Notification" onPress={scheduleNotification} />
    //         <StatusBar style="auto" />
    //     </View>
    // );
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
            <Text>Your Expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await sendPushNotification(expoPushToken);
                }}
            />
        </View>
    );
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
