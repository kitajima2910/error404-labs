import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {

    const { signOut, user } = useAuth()

    const [habits, setHabits] = useState<Habit[]>();

    const fetchHabits = async () => {
        try {
            const response = await database.listDocuments(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                [Query.equal("user_id", user?.$id ?? "")]
            )

            console.table(response)
            setHabits(response.documents as Habit[])
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [user])

    return (
        <View style={styles.view}>
            <Button mode="text" onPress={() => signOut()} icon={"logout"}>Đăng Xuất</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    LinkLogin: {
        backgroundColor: "orange",
        padding: 10,
        margin: 10,
        borderRadius: 10
    }
});
