import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const TextButton = ({ text, setCurrent, current }) => {
  return (
    <Pressable
      onPress={() => setCurrent(text)}
      style={[
        styles.container,
        { backgroundColor: current === text ? "red" : "white" },
      ]}
    >
      <Text
        style={[styles.text, { color: current === text ? "white" : "black" }]}
      >
        {text.toUpperCase()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default TextButton;
