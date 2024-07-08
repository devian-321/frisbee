import React from "react";
import {View,StyleSheet } from "react-native";
import Card from "./src/components/tinderCard";
import users from "./TinderAssets/assets/data/users";


const App = () => {
  return (
    <View style={styles.pageContainer}>
      <Card user = {users[3]} />
    </View>
  );
};
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
