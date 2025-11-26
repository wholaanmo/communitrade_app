import { useState } from "react";
import RequestService from "../services/RequestService";
import { ENDPOINTS } from "../constants/apiConstants";

export function useUserRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await RequestService.get(ENDPOINTS.USERS, token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await RequestService.get(`${ENDPOINTS.USERS}/${userId}`, token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getUsers, getUserById, loading, error };
}