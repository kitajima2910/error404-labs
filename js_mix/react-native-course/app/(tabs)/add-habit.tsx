import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = ["Hằng ngày", "Tuần", "Tháng"];
type Frequency = typeof FREQUENCIES[number];

const AddHabitScreen = () => {

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [frequency, setFrequency] = useState<string>("Hằng ngày")

    return (
        <>
            <View style={styles.container}>
                <TextInput onChangeText={setTitle} mode="outlined" label="Tiêu đề" style={styles.textInput} />
                <TextInput onChangeText={setDescription} mode="outlined" label="Mô tả"  style={styles.textInput} />
                <View style={styles.frequency}>
                    <SegmentedButtons value={frequency} onValueChange={(value) => setFrequency(value as Frequency)}
                        buttons={FREQUENCIES.map((freq) => ({
                            value: freq,
                            label: freq.charAt(0).toUpperCase() + freq.slice(1),
                        }))}

                    />
                </View>
                <Button  mode="contained" disabled={!title || !description}>Thêm</Button>
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
        marginBottom: 16
    },
    frequency: {
        marginBottom: 24
    },
    segmentedButtons: {
        marginBottom: 16
    },
    button: {
        marginBottom: 8
    }
});

export default AddHabitScreen;
