import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
const Home = ({ setImage }) => {
  const openLibraray = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginVertical: 20 }}>
        Image Editing App
      </Text>
      <AppButton
        icon={"image-outline"}
        onPress={openLibraray}
        color="#30A2FF"
        title={"From Gallery"}
      />
      {/* <AppButton
        icon={"camera-outline"}
        onPress={openLibraray}
        color="#EB455F"
        title={"From Camera"}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
