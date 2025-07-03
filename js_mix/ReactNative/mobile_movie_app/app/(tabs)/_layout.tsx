import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import styled from "styled-components/native";

const TabIcon = ({ focused, text, icon }: any) => {
    return (
        <ImageBackground focused={focused} source={focused && images.highlight}>
            <Image focused={focused} source={icon} tintColor={focused ? "#120426" : "#A9ABC3"} 
                style={ text === "Home" && focused &&  { marginLeft: 20 }}
            />
            <Text focused={focused}
                style={ text === "Profile" && focused &&  { marginRight: 20 }}
            >{focused ? text : ""}</Text>
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
                    height: 48,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 0,
                    borderColor: "#f0d23"
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
    min-width: 125px;
    min-height: 48px;
    margin-top: 14px;
    border-radius: 50px;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text<{ focused?: boolean }>`
    font-weight: 400;
    ${(props) =>
        props.focused &&
        `
        margin-left: 5px;
        color: #151312;
    `}
    font-size: 17px;
`;

const Image = styled.Image<{ focused?: boolean }>`
    ${(props) =>
        props.focused &&
        `
        margin-right: 5px;
    `}
`;
