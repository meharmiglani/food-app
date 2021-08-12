import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const CategoryGridTile = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableComponent style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },

  container: {
    flex: 1,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    //Android only --> elevation
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    textAlign: "right",
    color: 'white'
  },
});

export default CategoryGridTile;
