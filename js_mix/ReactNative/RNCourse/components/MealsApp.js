import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoriesScreen from '../screens/CategoriesScreen'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MealsOverviewScreen from '../screens/MealsOverviewScreen'

const Stack = createNativeStackNavigator()

const MealsApp = () => {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='MealsCategories' component={CategoriesScreen} />
                    <Stack.Screen name='MealsOverview' component={MealsOverviewScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default MealsApp

const styles = StyleSheet.create({})