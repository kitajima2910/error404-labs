import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowDownTrayIcon, HeartIcon } from 'react-native-heroicons/solid';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { storeColors } from '../theme';

export default function GameCard({ game }) {
    const [isFavourite, setFavourite] = useState(false);
    return (
        <View className="relative mr-4">
            <Image source={game.image} className="w-80 h-60 rounded-3xl" />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
                className="absolute flex justify-between w-full h-full p-4 rounded-3xl"
            >
                <View className="flex-row justify-end">
                    <TouchableOpacity
                        onPress={() => setFavourite(!isFavourite)}
                        className="p-3 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                        <HeartIcon size="25" color={isFavourite ? storeColors.redHead : 'white'} />
                    </TouchableOpacity>
                </View>
                <View className="space-y-1">
                    <View className="mb-2">
                        <StarRatingDisplay maxStars={5} rating={game.stars} starSize={15} />
                    </View>
                    <Text className="ml-2 text-xl font-bold text-gray-300">{game.title}</Text>
                    <View className="flex-row items-center ml-1 space-x-2">
                        <ArrowDownTrayIcon size="18" color="lightgray" />
                        <Text className="mt-1 ml-1 text-sm font-semibold text-gray-300">
                            {game.downloads} Downloads
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
