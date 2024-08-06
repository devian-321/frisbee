// src/screens/createUser/Gender.js
import { Picker } from "@react-native-picker/picker";
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

const Gender = ({ navigation }) => {
  const [gender, setGender] = useState("");

  const handleNext = () => {
    if (gender) {
      console.log("Selected gender:", gender);
      navigation.navigate('MainApp');
    } else {
      alert("Please select a gender");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
            mode="dropdown"
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Non-binary" value="non-binary" />
            <Picker.Item label="Prefer not to say" value="not-specified" />
          </Picker>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.privacyText}>
          We are very cautious about your privacy. Your data will not be shared.
        </Text>
        <TouchableOpacity
          style={[styles.button, !gender && styles.buttonInactive]}
          onPress={handleNext}
          disabled={!gender}
        >
          <Text style={styles.buttonText}>Next</Text>
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
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  pickerContainer: {
    width: width - 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 50,
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
  button: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonInactive: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Gender;
