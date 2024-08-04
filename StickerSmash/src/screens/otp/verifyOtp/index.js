// src/screens/verifyOTP/index.js
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const VerifyOTP = ({ navigation }) => {
  const [otp, setOTP] = useState(["", "", "", ""]);

  const handleVerify = () => {
    // Here you would typically verify the OTP with your backend
    // For now, we'll just navigate to the MainApp
    navigation.replace("MainApp");
  };

  const handleResend = () => {
    // Here you would typically resend the OTP
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
    <View style={styles.container}>
      <Text style={styles.title}>FrisBee</Text>
      <Image
        source={require("../../../../TinderAssets/assets/images/first_event_image.png")} // Make sure to add this image to your assets
        style={styles.image}
      />
      <Text style={styles.label}>Enter 4-digit</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7A00",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    width: "22%",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
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
