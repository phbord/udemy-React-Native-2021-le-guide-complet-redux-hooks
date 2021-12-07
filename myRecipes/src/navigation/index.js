import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TasksScreen from '../screens/Tasks';
import { RecipesStack } from './RecipesStack';


const Tabs = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{headerShown: false}}>
        <Tabs.Screen name="Recipes" component={RecipesStack}/>
        <Tabs.Screen name="List" component={TasksScreen}/>
      </Tabs.Navigator>
    </NavigationContainer>
  )
}
