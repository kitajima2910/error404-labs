import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Bars3CenterLeftIcon, BellIcon } from "react-native-heroicons/solid";
import { storeColors } from "../theme";

const categories = ["Action", "Family", "Puzzle", "Adventure", "Racing", "Education", "Others"];

const StoreScreen = () => {
    return (
        <LinearGradient colors={["rgba(58, 131, 244, 0.4)", "rgba(9, 181, 211, 0.4)"]} className="w-full flex-1">
            <SafeAreaView>
                <View className="container">
                    <View className="flex-row justify-between items-center px-4">
                        <Bars3CenterLeftIcon color={storeColors.text} size={30} />
                        <BellIcon color={storeColors.text} size={30} />
                    </View>

                    {/* categories */}
                    <View className="mt-3 space-y-4">
                        <Text style={{ color: storeColors.text }} className="ml-4 text-3xl font-bold mb-4">
                            Browse Games
                        </Text>
                        <View className="pl-4">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {categories.map((cat) => {
                                    return (
                                        <TouchableOpacity key={cat} className="bg-blue-200 p-3 px-4 rounded-full">
                                            <Text>{cat}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default StoreScreen;
