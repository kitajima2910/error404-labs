import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const FREQUENCIES = ["Hằng ngày", "Tuần", "Tháng"];
type Frequency = (typeof FREQUENCIES)[number];

const AddHabitScreen = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("Hằng ngày");
    const [error, setError] = useState<string | null>("");

    const { user } = useAuth();

    const router = useRouter();

    const theme = useTheme()

    const handleSubmit = async () => {
        if (!user) return;

        try {
            await database.createDocument(DATABASE_ID, HABITS_COLLECTION_ID, ID.unique(), {
                user_id: user.$id,
                title,
                description,
                frequency,
                streak_count: 0,
                last_completed: new Date().toISOString(),
                created_at: new Date().toISOString(),
            });

            router.back();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return
            }

            setError("Đã xảy ra lỗi trong quá trình thêm");
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput onChangeText={setTitle} mode="outlined" label="Tiêu đề" style={styles.textInput} />
                <TextInput onChangeText={setDescription} mode="outlined" label="Mô tả" style={styles.textInput} />
                <View style={styles.frequency}>
                    <SegmentedButtons
                        value={frequency}
                        onValueChange={(value) => setFrequency(value as Frequency)}
                        buttons={FREQUENCIES.map((freq) => ({
                            value: freq,
                            label: freq.charAt(0).toUpperCase() + freq.slice(1),
                        }))}
                    />
                </View>
                <Button onPress={() => handleSubmit()} mode="contained" disabled={!title || !description}>
                    Thêm
                </Button>
                { error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },
    textInput: {
        marginBottom: 16,
    },
    frequency: {
        marginBottom: 24,
    },
    segmentedButtons: {
        marginBottom: 16,
    },
    button: {
        marginBottom: 8,
    },
});

export default AddHabitScreen;
