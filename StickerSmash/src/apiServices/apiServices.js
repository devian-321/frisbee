import axios from "axios";
import { API_ENDPOINTS, API_METHODS } from "../../apiConfig.js";

export const sendOTP = async (phoneNumber) => {
  try {
    console.log("Sending OTP to:", phoneNumber);
    const response = await axios.post(
      API_ENDPOINTS.SEND_OTP,
      {
        "phoneNumber":phoneNumber
      },
      {
        headers: {
            "Content-Type": "application/json",
          },
      }
    );

    console.log("Response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send OTP");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await axios({
      method: API_METHODS.POST,
      url: API_ENDPOINTS.VERIFY_OTP,
      data: { phoneNumber, otp },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
