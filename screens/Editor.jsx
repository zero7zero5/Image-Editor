import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

// Open GL Libraries
import { Surface } from "gl-react-expo";
import ImageFilters from "react-native-gl-image-filters";
import { ExpoImageManipulator } from "react-native-expo-image-cropper";

import TextButton from "../components/TextButton";
import AppSlider from "../components/AppSlider";
import { captureRef } from "react-native-view-shot";

const width = Dimensions.get("window").width - 10;
const settings = [
  {
    name: "crop",
  },
  {
    name: "hue",
    minValue: 0,
    maxValue: 6.0,
  },
  {
    name: "blur",
    minValue: 0,
    maxValue: 30,
    step: 1,
  },
  {
    name: "sepia",
    minValue: -5,
    maxValue: 5,
    step: 1,
  },
  {
    name: "sharpen",
    minValue: 0,
    maxValue: 15,
    step: 1,
  },
  {
    name: "negative",
    minValue: -2.0,
    maxValue: 2.0,
    step: 0.5,
  },
  {
    name: "contrast",
    minValue: -10.0,
    maxValue: 10.0,
    step: 1,
  },
  {
    name: "saturation",
    minValue: 0,
    maxValue: 2,
    step: 0.5,
  },
  {
    name: "brightness",
    minValue: 0,
    maxValue: 5,
    step: 1,
  },
  {
    name: "temperature",
    minValue: 0.0,
    maxValue: 40000.0,
    step: 1000,
  },
  {
    name: "exposure",
    step: 0.5,
    minValue: -1.0,
    maxValue: 1.0,
  },
];
const orginal = {
  ...settings,
  hue: 0,
  blur: 0,
  sepia: 0,
  sharpen: 0,
  negative: 0,
  contrast: 1,
  saturation: 1,
  brightness: 1,
  temperature: 6500,
  exposure: 0,
};
const Editor = ({ image, clearImage, setImage }) => {
  let glViewRef;
  const [state, setState] = useState({
    ...settings,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
  });
  const [current, setCurrent] = useState("hue");
  const [modal, setModal] = useState(true);
  const reset = () => {
    setState(orginal);
  };
  const save = async () => {
    const result = await captureRef(glViewRef, {
      format: "jpg",
      quality: 1,
    });
    setImage(result);
    setState(orginal);
  };
  const handleToggle = () => {
    setModal(false);
    setCurrent("hue");
    setModal(true);
  };
  const handleDownload = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(image);
      await MediaLibrary.saveToLibraryAsync(asset.uri);
      alert("Imge Downloaded Successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable onPress={clearImage}>
          <MaterialCommunityIcons color="white" size={35} name="close" />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <MaterialCommunityIcons size={35} color="white" name="download" />
        </Pressable>
      </View>
      {current === "crop" ? (
        <ExpoImageManipulator
          photo={{ uri: image }}
          isVisible={modal}
          onPictureChoosed={(data) => {
            setImage(data.uri);
          }}
          onToggleModal={handleToggle}
          saveOptions={{
            compress: 1,
            format: "jpg",
            base64: true,
          }}
        />
      ) : (
        <>
          <Surface
            resizeMode="contain"
            style={{ width: width, height: width }}
            ref={(ref) => {
              glViewRef = ref;
            }}
          >
            <ImageFilters {...state} width={width} height={width}>
              {{ uri: image }}
            </ImageFilters>
          </Surface>
          <View style={styles.scrollViewContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {settings.map((i) => (
                <View key={i.name}>
                  <TextButton
                    current={current}
                    setCurrent={(i) => setCurrent(i)}
                    text={i.name}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          {current && (
            <View
              style={{
                position: "absolute",
                bottom: 40,
                width: "100%",
                alignItems: "center",
              }}
            >
              <AppSlider
                min={settings.filter((i) => i.name === current)[0].minValue}
                max={settings.filter((i) => i.name === current)[0].maxValue}
                step={settings.filter((i) => i.name === current)[0].step}
                value={state[current]}
                onchange={(value) => setState({ ...state, [current]: value })}
                reset={reset}
                save={save}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    top: StatusBar.currentHeight + 20,
  },
  scrollViewContainer: {
    position: "absolute",
    bottom: 150,
  },
});
export default Editor;
