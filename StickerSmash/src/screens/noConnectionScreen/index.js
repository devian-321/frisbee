import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoConnectionScreen = ({ navigation }) => {
  const handleRetry = () => {
    navigation.replace("Splash");
  };

  return (
    <View style={styles.container}>
      <Icon name="cloud-offline-outline" size={100} color="#FF7A00" />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>No Internet Connection</Text>
      <Text style={styles.message}>
        Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7A00",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: "#FF7A00",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NoConnectionScreen;
