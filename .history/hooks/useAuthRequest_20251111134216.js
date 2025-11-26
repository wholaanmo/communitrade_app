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

  const logout = async (token) => {
    setLoading(true);
    setError(null);
    try {
      // If you have a logout endpoint
      // const data = await RequestService.post(ENDPOINTS.LOGOUT, null, token);
      // return data;
      
      // For now, just clear local storage or handle client-side
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, loading, error };
}
