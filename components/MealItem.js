import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import DefaultText from "../components/DefaultText";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.BGImage}
            >
              <Text style={styles.title}>{props.title}</Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealFooter }}>
            <DefaultText style={{ color: "green" }}>
              {props.duration} m
            </DefaultText>
            <DefaultText style={{ color: "green" }}>
              {props.complexity.toUpperCase()}
            </DefaultText>
            <DefaultText style={{ color: "green" }}>
              {props.affordability.toUpperCase()}
            </DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row",
  },

  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },

  mealHeader: {
    height: "87%",
  },

  mealFooter: {
    height: "13%",
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
  },

  BGImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default MealItem;
