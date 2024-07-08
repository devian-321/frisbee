import React from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
          }}
          style={styles.ImageCompoment}
        >
          <View style={styles.cardInnerTextCompoment}>
            <Text style={styles.name}>Zuck</Text>
            <Text style={styles.bio}>
              No need to send me your nudes, I already saw them
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageCompoment: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",

    justifyContent: "flex-end",
  },
  card: {
    width: "95%",
    height: "70%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  name: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  bio: {
    fontSize: 18,
    color: "white",
    lineHeight: 25,
  },
  cardInnerTextCompoment: {
    padding: 10,
  },
});

export default App;
