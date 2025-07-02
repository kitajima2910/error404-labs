import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import styled from "styled-components/native";

const TabIcon = ({ focused, text, icon }: any) => {
    return (
        <ImageBackground source={focused ? images.highlight : ""}>
            <Image source={icon} tintColor={focused ? "#151312" : "#ab8bff"} />
            <Text focused={focused}>{focused ? text : ""}</Text>
        </ImageBackground>
    );
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#151312",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 50,
                    height: 50,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 0,
                    // borderColor: "#f0d23"
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} text="Home" icon={icons.home} />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} text="Search" icon={icons.search} />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} text="Saved" icon={icons.save} />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon focused={focused} text="Profile" icon={icons.person} />
                        </>
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;

const ImageBackground = styled.ImageBackground<{ focused?: boolean }>`
    background-color: ${({ focused }) => (focused ? "#ab8bff" : "")};
    min-width: 100px;
    min-height: 60px;
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
`;

const Text = styled.Text<{ focused?: boolean }>`
    font-weight: 400;
    ${(props) =>
        props.focused &&
        `
        margin-left: 5px;
    `}
    font-size: 16px;
`;

const Image = styled.Image``;
