import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    ArrowDownCircleIcon,
    ArrowDownTrayIcon,
    Bars3CenterLeftIcon,
    BellIcon,
} from 'react-native-heroicons/solid';
import { storeColors } from '../theme';
import GradientButton from '../components/gradientButton';
import GameCard from '../components/gameCard';

const categories = ['Action', 'Family', 'Puzzle', 'Adventure', 'Racing', 'Education', 'Others'];
const featured = [
    {
        id: 1,
        title: 'Zooba',
        image: require('../assets/images/zooba.png'),
        downloads: '200k',
        stars: 4,
    },
    {
        id: 2,
        title: 'Subway Surfer',
        image: require('../assets/images/subway.png'),
        downloads: '5M',
        stars: 4,
    },
    {
        id: 3,
        title: 'Free Fire',
        image: require('../assets/images/freeFire.png'),
        downloads: '100M',
        stars: 3,
    },

    {
        id: 4,
        title: "Alto's Adventure",
        image: require('../assets/images/altosAdventure.png'),
        downloads: '20k',
        stars: 4,
    },
];
const games = [
    {
        id: 1,
        title: 'Shadow Fight',
        image: require('../assets/images/shadowFight.png'),
        downloads: '20M',
        stars: 4.5,
    },
    {
        id: 2,
        title: 'Valor Arena',
        image: require('../assets/images/valorArena.png'),
        downloads: '10k',
        stars: 3.4,
    },
    {
        id: 3,
        title: 'Frag',
        image: require('../assets/images/frag.png'),
        downloads: '80k',
        stars: 4.6,
    },
    {
        id: 4,
        title: 'Zooba Wildlife',
        image: require('../assets/images/zoobaGame.png'),
        downloads: '40k',
        stars: 3.5,
    },
    {
        id: 5,
        title: 'Clash of Clans',
        image: require('../assets/images/clashofclans.png'),
        downloads: '20k',
        stars: 4.2,
    },
];

const StoreScreen = () => {
    const [activeCategory, setActiveCategory] = useState('Active');
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <LinearGradient
            colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
            className="flex-1 w-full"
        >
            <SafeAreaView>
                <View className="container">
                    <View className="flex-row items-center justify-between px-4">
                        <Bars3CenterLeftIcon color={storeColors.text} size={30} />
                        <BellIcon color={storeColors.text} size={30} />
                    </View>

                    {/* categories */}
                    <View className="mt-3 space-y-4">
                        <Text
                            style={{ color: storeColors.text }}
                            className="mb-4 ml-4 text-3xl font-bold"
                        >
                            Browse Games
                        </Text>
                        <View className="pl-4">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {categories.map((cat) => {
                                    if (cat == activeCategory) {
                                        return (
                                            <GradientButton
                                                key={cat}
                                                value={cat}
                                                containerClass="mr-2"
                                            />
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => setActiveCategory(cat)}
                                                key={cat}
                                                className="p-3 px-4 mr-2 bg-blue-200 rounded-full"
                                            >
                                                <Text>{cat}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    {/* featured now */}
                    <View className="mt-3 space-y-4">
                        <Text
                            style={{ color: storeColors.text }}
                            className="mb-4 ml-4 text-lg font-bold"
                        >
                            Featured Games
                        </Text>
                        <View className="pl-4">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {featured.map((item, index) => {
                                    return <GameCard key={index} game={item} />;
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    {/* top action game list */}
                    <View className="mt-3 space-y-4">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text
                                style={{ color: storeColors.text }}
                                className="mb-4 ml-4 text-lg font-bold"
                            >
                                Top Action Games
                            </Text>
                            <TouchableOpacity>
                                <Text className="mr-4 text-lg font-semibold text-blue-600">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: 320 }} showsHorizontalScrollIndicator={false}>
                            {games.map((game, index) => {
                                let bg = '';
                                if (game.id == selectedGame) {
                                    // bg = 'rgba(58, 131, 244, 0.4)';
                                    bg = 'rgba(255, 255, 255, 0.4)';
                                } else {
                                    bg = 'transparent';
                                }

                                return (
                                    <TouchableOpacity
                                        style={{ backgroundColor: bg }}
                                        onPress={() => setSelectedGame(game.id)}
                                        className="flex-row p-2 mx-4 mb-2 rounded-3xl"
                                        key={index}
                                    >
                                        <Image
                                            source={game.image}
                                            style={{ width: 80, height: 80 }}
                                            className="rounded-2xl"
                                        />
                                        <View className="flex-col ml-4 justify-evenly">
                                            <View className="">
                                                <Text
                                                    color={storeColors.text}
                                                    className="font-semibold"
                                                >
                                                    {game.title}
                                                </Text>
                                            </View>
                                            <View className="flex-row justify-between">
                                                <View className="flex-row items-center mr-3 space-x-3">
                                                    <Image
                                                        className="w-4 h-4 mr-2 opacity-80"
                                                        source={require('../assets/images/fullStar.png')}
                                                    />
                                                    <Text className="font-semibold text-gray-700">
                                                        {game.stars} stars
                                                    </Text>
                                                </View>
                                                <View className="flex-row items-center space-x-3">
                                                    <ArrowDownTrayIcon
                                                        style={{ marginTop: 2, marginRight: 2 }}
                                                        size="18"
                                                        color="blue"
                                                    />
                                                    <Text className="mt-1 font-semibold text-gray-700">
                                                        {game.downloads}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className="flex-row items-center justify-center ml-auto">
                                            <GradientButton
                                                value="Play"
                                                containerClass="py-2 px-5"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default StoreScreen;
