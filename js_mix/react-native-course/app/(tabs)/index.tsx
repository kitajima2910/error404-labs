import { useAuth } from "@/lib/auth-context";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

    const { signOut } = useAuth()

    return (
        <View style={styles.view}>
            <Text>Trang chủ</Text>
            {/* <Link href={"/login"} style={styles.LinkLogin}>Đăng Nhập</Link> */}
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
