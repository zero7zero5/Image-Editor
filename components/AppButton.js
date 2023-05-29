import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AppButton = ({ icon, title, onPress, color = "#fc5c65" }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <View style={[styles.button, { backgroundColor: color }]}>
        <MaterialCommunityIcons size={50} name={icon} color="white" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    width: 150,
    borderRadius: 25,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    margin: 10,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
export default AppButton;
