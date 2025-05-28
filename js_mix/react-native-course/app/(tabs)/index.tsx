import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.view}>
            <Text>Hello World!</Text>
            {/* <Link href={"/login"} style={styles.LinkLogin}>Đăng Nhập</Link> */}
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
