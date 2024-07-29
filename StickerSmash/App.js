import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import Footer from "./src/components/footerNavbar/index.js";
import Header from "./src/components/header/index.js";
import Events from "./src/screens/events/index.js";
import Messages from "./src/screens/messages/index.js";
import NoConnectionScreen from "./src/screens/noConnectionScreen/index.js";
import Profile from "./src/screens/profile/index.js";
import SplashScreen from "./src/screens/splashScreen/index.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => (
  <View style={styles.pageContainer}>
    <Header />
    <Tab.Navigator
      tabBar={(props) => <Footer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="NoConnection" component={NoConnectionScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
});

export default App;
