import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "../components/MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favMeals);
  const renderMealItem = (itemData) => {
    const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageURL}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isMealFav: isFav,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, _) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default MealList;
