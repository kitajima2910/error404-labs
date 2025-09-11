import { client, database, DATABASE_ID, HABITS_COLLECTION_ID, RealtimeResponse } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
    const { signOut, user } = useAuth();

    const [habits, setHabits] = useState<Habit[]>();

    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

    const fetchHabits = async () => {
        try {
            const response = await database.listDocuments(DATABASE_ID, HABITS_COLLECTION_ID, [Query.equal("user_id", user?.$id ?? "")]);
            console.log(response);
            setHabits(response.documents as Habit[]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user) return;

        const channel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents.*`;

        const unsubscribe = client.subscribe(channel, (response: RealtimeResponse) => {
            console.log("Realtime event:", response);
            const eventStr = response.events.join(",");
            if (eventStr.includes("create") || eventStr.includes("update") || eventStr.includes("delete")) {
                fetchHabits();
            }
        });

        fetchHabits();

        return () => {
            unsubscribe();
        };
    }, [user]);

    const renderLeftActions = () => {
        return <></>;
    };

    const renderRightActions = () => {
        return <></>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineLarge">Hôm nay</Text>
                <Button mode="text" onPress={() => signOut()} icon={"logout"}>
                    <Text style={styles.logout}>Đăng Xuất</Text>
                </Button>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {habits?.length === 0 ? (
                        <View>
                            <Text>Chưa có gì cả, bạn hãy thêm vào!</Text>
                        </View>
                    ) : (
                        habits?.map((habits, key) => (
                            <Swipeable
                                ref={(ref) => {
                                    swipeableRefs.current[habits.$id ?? key] = ref;
                                }}
                                key={key}
                                overshootLeft={false}
                                overshootRight={false}
                                renderLeftActions={renderLeftActions}
                                renderRightActions={renderRightActions}
                            >
                                <Surface elevation={0}>
                                    <View>
                                        <Text style={styles.cardTitle}>{habits.title}</Text>
                                        <Text style={styles.cardDescription}>{habits.description}</Text>
                                        <View style={styles.cardFooter}>
                                            <View style={styles.cardFooterItem}>
                                                <View style={styles.cardFooterItemIcon}>
                                                    <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
                                                </View>
                                                <Text style={styles.cardFooterItemText}>{habits.streak_count} ngày streak</Text>
                                            </View>
                                            <View style={styles.cardFooterItemV2}>
                                                <Text style={styles.cardFooterItemTextV2}>{habits.frequency.charAt(0).toUpperCase() + habits.frequency.slice(1)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Surface>
                            </Swipeable>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    content: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        margin: 16,
        backgroundColor: "#F6F0F8",
        borderRadius: 10,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    LinkLogin: {
        backgroundColor: "orange",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 16,
    },
    cardDescription: {
        fontSize: 12,
        marginLeft: 16,
        marginBottom: 16,
        color: "#5f5f5f",

        fontWeight: "600",
    },
    cardFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    cardFooterItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FBF1E0",
    },
    cardFooterItemIcon: {
        marginRight: 8,
    },
    cardFooterItemText: {
        fontSize: 12,
        color: "#DCAC6D",
        display: "flex",
        fontWeight: "bold",
    },
    cardFooterItemV2: {
        backgroundColor: "#E9E3F2",
        padding: 8,
        borderRadius: 10,
    },
    cardFooterItemTextV2: {
        fontSize: 12,
        color: "#7863B2",
        fontWeight: "bold",
    },
    logout: {
        color: "#7863B2",
        fontSize: 16,
        fontWeight: "600",
    },
});
