import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/header/headerWithoutTitle.js";

const { width } = Dimensions.get("window");

const Permissions = ({ navigation }) => {
  const [locationAccess, setLocationAccess] = useState(false);
  const [contactAccess, setContactAccess] = useState(false);

  const handleLocationAccess = () => {
    setLocationAccess(!locationAccess);
    // Implement actual location permission request here

  };

  const handleContactAccess = () => {
    setContactAccess(!contactAccess);
    // Implement actual contact permission request here
  };

  const handleNext = () => {
    console.log("Location access:", locationAccess);
    console.log("Contact access:", contactAccess);
    navigation.navigate('Gender');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              locationAccess && styles.permissionGranted,
            ]}
            onPress={handleLocationAccess}
          >
            <Text style={styles.permissionButtonText}>
              Allow access to Location *
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              contactAccess && styles.permissionGranted,
            ]}
            onPress={handleContactAccess}
          >
            <Text style={styles.permissionButtonText}>
              Allow access to Contact *
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.privacyText}>
          We are very cautious about your privacy. Your data will not be shared.
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  permissionButton: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  permissionGranted: {
    backgroundColor: "#FFB366", // Lighter orange to indicate granted permission
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomContainer: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
  },
  privacyText: {
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Permissions;
