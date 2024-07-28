import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from "./src/components/header/index.js";
import Footer from "./src/components/footerNavbar/index.js";
import Events from "./src/screens/events/index.js";
import Messages from "./src/screens/messages/index.js";
import Profile from "./src/screens/profile/index.js";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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