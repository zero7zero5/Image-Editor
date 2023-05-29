import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { LogBox } from "react-native";

import Home from "./screens/Home";
import Editor from "./screens/Editor";

export default function App() {
  const [image, setImage] = useState("");
  useEffect(() => {
    const askPermission = async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      if (!result.granted) return alert("Required Camera Permission");

      const result2 = await MediaLibrary.requestPermissionsAsync();
      if (!result2.granted) return alert("Required Media Permission");
    };
    askPermission();
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <View style={styles.container}>
      {!image ? (
        <Home setImage={(img) => setImage(img)} />
      ) : (
        <Editor
          setImage={(i) => setImage(i)}
          clearImage={() => setImage(null)}
          image={image}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
