import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Switch } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from '../store/actions/actionMeals';

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.primaryColor }}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setisGlutenFree] = useState(false);
  const [isLactoseFree, setisLactoseFree] = useState(false);
  const [isVegan, setisVegan] = useState(false);
  const [isVegetarian, setisVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.filter}>Available Filters</Text>
      <FilterSwitch
        state={isGlutenFree}
        label='Gluten Free'
        onChange={(newVal) => setisGlutenFree(newVal)}
      />
      <FilterSwitch
        state={isLactoseFree}
        label='Lactose Free'
        onChange={(newVal) => setisLactoseFree(newVal)}
      />
      <FilterSwitch
        state={isVegan}
        label='Vegan'
        onChange={(newVal) => setisVegan(newVal)}
      />
      <FilterSwitch
        state={isVegetarian}
        label='Vegetarian'
        onChange={(newVal) => setisVegetarian(newVal)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Apply Filters",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={() => {
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },

  filter: {
    fontFamily: "open-sans-bold",
    margin: 18,
    textAlign: "center",
    fontSize: 20,
  },
});

export default FilterScreen;
