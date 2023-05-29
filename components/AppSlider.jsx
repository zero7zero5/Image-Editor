import React from "react";
import Slider from "@react-native-community/slider";
import { Pressable, Text, View } from "react-native";
import TextButton from "./TextButton";
const AppSlider = ({ min, max, step, onchange, value, reset, save }) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Slider
        style={{ width: "70%" }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        onValueChange={(value) => onchange(value)}
      />
      <Text style={{ color: "white", fontSize: 25, marginVertical: 10 }}>
        {value}
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            width: "100%",
          }}
          onPress={reset}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            Reset
          </Text>
        </Pressable>
        <Pressable onPress={save}>
          <Text style={{ color: "white", fontSize: 20 }}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AppSlider;
