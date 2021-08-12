import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/actionMeals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  //Can do this but the title takes some time to load as useEffect() runs after the component has been rendered for the first time
  //Better solution is to pass the title from the previous screen/component that we come from

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({
      isFavMeal: currentMealIsFavorite,
    });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageURL }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText style={{ color: "green" }}>
          {selectedMeal.duration} m
        </DefaultText>
        <DefaultText style={{ color: "green" }}>
          {selectedMeal.complexity.toUpperCase()}
        </DefaultText>
        <DefaultText style={{ color: "green" }}>
          {selectedMeal.affordability.toUpperCase()}
        </DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (data) => {
  const mealTitle = data.navigation.getParam("mealTitle");
  const toggleFavorite = data.navigation.getParam("toggleFav");
  const isMealFav = data.navigation.getParam("isFavMeal");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Fav'
          iconName={isMealFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 275,
  },

  details: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 2,
  },

  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 18,
    color: Colors.primaryColor,
  },

  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 2,
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
    padding: 2.5,
  },
});

export default MealDetailScreen;
