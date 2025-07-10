import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'



const CategoriesScreen = ({ navigation }) => {



    const renderCategoryItem = (itemData) => {

        const pressHandler = () => {
            navigation.navigate("MealsOverview", {
                categoryId: itemData.item.id
            })
        }

        // console.log("pxh: ", itemData)

        return <>
            <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} navigation={navigation} />
        </>
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({})