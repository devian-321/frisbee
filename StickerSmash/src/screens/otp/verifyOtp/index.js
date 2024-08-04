// src/screens/verifyOTP/index.js
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/header/index.js";

const { height, width } = Dimensions.get("window");

const VerifyOTP = ({ navigation }) => {
  const [otp, setOTP] = useState(["", "", "", ""]);

  const handleVerify = () => {
    navigation.replace("MainApp");
  };

  const handleResend = () => {
    console.log("Resending OTP");
  };

  const handleOTPChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    if (text && index < 3) {
      this[`otpInput${index + 1}`].focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../TinderAssets/assets/images/second_event_image.jpeg")}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter 4-digit OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleOTPChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(input) => {
                  this[`otpInput${index}`] = input;
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>VERIFY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
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
    marginBottom: 20,
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 15,
    width: "22%",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendButton: {
    alignItems: "center",
  },
  resendText: {
    color: "#FF7A00",
    fontSize: 16,
  },
});

export default VerifyOTP;
