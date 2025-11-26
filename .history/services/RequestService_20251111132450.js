import { API_BASE_URL } from "../constants/apiConstants";

export async function sendRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}
