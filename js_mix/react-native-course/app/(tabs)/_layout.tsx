import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Trang Chủ",
                        tabBarIcon: ({ color, focused }) => (focused ? <MaterialCommunityIcons name="home" size={24} color={color} /> : <AntDesign name="home" size={24} color="black" />),
                    }}
                />
                <Tabs.Screen
                    name="login"
                    options={{
                        title: "Trang Đăng Nhập",
                        tabBarIcon: ({ color, focused }) => (focused ? <MaterialCommunityIcons name="login" size={24} color={color} /> : <AntDesign name="login" size={24} color="black" />),
                    }}
                />
            </Tabs>
        </>
    );
}
