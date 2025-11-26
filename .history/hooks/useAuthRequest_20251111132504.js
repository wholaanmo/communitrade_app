import { useState } from "react";
import { sendRequest } from "../services/RequestService";
import { ENDPOINTS } from "../constants/apiConstants";

export function useAuthRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sendRequest(ENDPOINTS.LOGIN, "POST", { email, password });
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sendRequest(ENDPOINTS.REGISTER, "POST", formData);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
