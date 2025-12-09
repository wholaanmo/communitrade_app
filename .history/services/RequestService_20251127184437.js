import { API_BASE_URL } from "../constants/apiConstants";

class RequestService {
  async sendRequest(endpoint, method = "GET", data = null, token = null) {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "API Error");
    }

    return res.json();
  }

  async get(endpoint, token = null) {
    return this.sendRequest(endpoint, "GET", null, token);
  }

  async post(endpoint, data, token = null) {
    return this.sendRequest(endpoint, "POST", data, token);
  }

  async put(endpoint, data, token = null) {
    return this.sendRequest(endpoint, "PUT", data, token);
  }

  async delete(endpoint, token = null) {
    return this.sendRequest(endpoint, "DELETE", null, token);
  }
}

export default new RequestService();
