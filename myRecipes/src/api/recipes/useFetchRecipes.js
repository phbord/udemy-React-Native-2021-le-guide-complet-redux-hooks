import { useDispatch } from "react-redux"
import axios from "axios"
//import Config from "react-native-config"

import { addRecipes, selectedRecipe } from "../../redux/actions"
const BASE_URL_API = "https://api.spoonacular.com/recipes/"
const API_KEY = "2a6730bb0c3044518f8927831c1582e0"
const MAX_PER_PAGE = 30


// CUSTOM HOOK
export const useFetchRecipes = () => {
  const dispatch = useDispatch()

  const getAllRecipes = async (page) => {
    console.log('------------->',API_KEY);
    try {
      const response = await axios.get(`${BASE_URL_API}complexSearch`, {
        params: {
          apiKey: API_KEY,
          number: MAX_PER_PAGE,
          offset: page * MAX_PER_PAGE // récuper 30 recettes
        }
      })

      dispatch(addRecipes(response.data.results))
    } catch(e) {
      console.log("Error in getAllRecipes: ", e)
    }
  }

  const getRecipeById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL_API}${id}/information`, {
        params: {
          apiKey: API_KEY
        }
      })
      console.log('RESPONSE --->>>',response.data);

      dispatch(selectedRecipe(response.data))
    } catch(e) {
      console.log("Error in getRecipeById: ", e)
    }
  }

  return {
    getAllRecipes,
    getRecipeById
  }
}