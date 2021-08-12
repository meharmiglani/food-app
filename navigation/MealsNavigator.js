import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
  headerTitleStyle: {
    maxWidth: 250,
  },
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const FavoriteNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MealsFavTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name='ios-restaurant'
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoriteNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons 
              name='ios-star' 
              size={25} 
              color={tabInfo.tintColor} 
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: "open-sans",
      },
      activeTintColor: "white",
      activeBackgroundColor: Colors.primaryColor,
    },
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Filters",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: "white",
      labelStyle: {
        fontFamily: "open-sans",
      },
      activeBackgroundColor: Colors.accentColor,
    },
  }
);

//One root Navigator
//Tab contains Stack as well
export default createAppContainer(MainNavigator);
