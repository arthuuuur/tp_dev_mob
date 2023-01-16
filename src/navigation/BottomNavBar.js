import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FavScreen from "../component/FavScreen";
import SearchScreen from "../component/SearchScreen";
import RecetteDetails from "../component/RecetteDetails";


const SearchNavigation = createStackNavigator();
const FavedNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function SearchStack() {
    return (
        <SearchNavigation.Navigator initialRouteName="ViewSearch">
            <SearchNavigation.Screen
                name="ViewSearch"
                component={SearchScreen}
                options={{ title: "Recherche" }}
            />
            <SearchNavigation.Screen
                name="ViewRecette"
                component={RecetteDetails}
                options={{ title: "Recette" }}
            />
        </SearchNavigation.Navigator>
    );
}

function FavedStack() {
    return (
        <FavedNavigation.Navigator initialRouteName="ViewFaved">
            <FavedNavigation.Screen
                name="ViewFaved"
                component={FavScreen}
                options={{ title: "Favoris" }}
            />
            <FavedNavigation.Screen
                name="ViewFilm"
                component={RecetteDetails}
                options={{ title: "recette" }}
            />
        </FavedNavigation.Navigator>
    );
}

function RootStack() {
    return (
        <TabNavigation.Navigator
            screenOptions={{
                tabBarActiveTintColor: "blue",
                headerShown: false,
            }}>
            <TabNavigation.Screen
                name="Recherche"
                component={SearchStack}
            />
            <TabNavigation.Screen
                name="Favoris"
                component={FavedStack}
            />
        </TabNavigation.Navigator>
    );
}

export default RootStack;

