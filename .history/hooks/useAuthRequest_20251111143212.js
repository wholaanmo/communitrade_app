import { useState } from "react";
import RequestService from "../services/RequestService";
import { ENDPOINTS } from "../constants/apiConstants";

export function useAuthRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await RequestService.post(ENDPOINTS.LOGIN, { email, password });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await RequestService.post(ENDPOINTS.REGISTER, formData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true, message: 'Logged out successfully' };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mock email verification
  const verifyEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: 'Verification email sent successfully' 
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, verifyEmail, loading, error };
}