import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MealItem = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default MealItem

const styles = StyleSheet.create({})