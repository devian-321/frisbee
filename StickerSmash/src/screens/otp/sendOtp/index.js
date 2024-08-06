import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/header/headerWithoutTitle.js";
import { sendOTP } from "../../../apiServices/apiServices.js";

const { height, width } = Dimensions.get("window");

const SendOTP = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateIndianPhoneNumber = (number) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(number);
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setIsValidNumber(validateIndianPhoneNumber(text));
  };

  const handleSendOTP = async () => {
    if (isValidNumber) {
      setIsLoading(true);
      try {
        const response = await sendOTP(`91${phoneNumber}`);

        if (response.message === "OTP sent successfully") {
          navigation.navigate("VerifyOTP", { phoneNumber: phoneNumber });
        } else {
          Alert.alert("Error", "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../TinderAssets/assets/images/first_event_image.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TouchableOpacity
            style={[
              styles.button,
              (!isValidNumber || isLoading) && styles.disabledButton,
            ]}
            onPress={handleSendOTP}
            disabled={!isValidNumber || isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "SENDING OTP..." : "SEND OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  imageContainer: {
    height: height * 0.5,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
});

export default SendOTP;
