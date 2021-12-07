import React, { useEffect } from 'react'
import { Text, Image, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { useFetchRecipes } from '../../api/recipes/useFetchRecipes'
import { getRecipesList, getSelectedRecipe } from '../../redux/selectors'
import Ingredient from './Ingredient'


export default function RecipesDetails({route, navigation}) {
  const {id} = route.params
  console.log('ID = ', id);
  const {getRecipeById} = useFetchRecipes()

  const recipe = useSelector(getSelectedRecipe)

  useEffect(() => {
    getRecipeById(id)
  }, [])

  if (!recipe) {
    return <View />
  }

  return (
    <ScrollView>
      <Image source={{uri: recipe.image}} style={styles.image}/>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.caption}>Ready in {recipe.readyInMinutes} minutes</Text>
      <Text style={styles.caption}>{recipe.summary}</Text>
      <View style={styles.containerIng}>
        <Text style={styles.titleIng}>Ingredients:</Text>
        {recipe.extendedIngredients?.map(ing => (
          <Ingredient ing={ing} />
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Revenir</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  caption: {
    textAlign: "center"
  },
  containerIng: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 6,
    borderTopColor: "grey",
    borderTopWidth: 1
  },
  titleIng: {
    fontSize: 16,
    fontWeight: "bold"
  }
})
