
import axios from 'axios';
import { API_ENDPOINTS, API_METHODS } from '../../apiConfig.js';

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await axios({
      method: API_METHODS.POST,
      url: API_ENDPOINTS.SEND_OTP,
      data: { phoneNumber:phoneNumber },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
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
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
