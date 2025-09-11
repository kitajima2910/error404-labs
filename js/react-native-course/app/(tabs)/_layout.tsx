import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{ 
                headerStyle: {
                    backgroundColor: "#f5f5f5"
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: "#f5f5f5",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: "#6200ee",
                tabBarInactiveTintColor: "#666666"
             }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Thói quen ngày nay",
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="calendar-today" size={24} color={color} />),
                    }}
                />
                <Tabs.Screen
                    name="streaks"
                    options={{
                        title: "Đường rạch",
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="chart-line" size={size} color={color} />),
                    }}
                />
                <Tabs.Screen
                    name="add-habit"
                    options={{
                        title: "Thêm công việc",
                        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="plus-circle" size={size} color={color} />),
                    }}
                />
            </Tabs>
        </>
    );
}
