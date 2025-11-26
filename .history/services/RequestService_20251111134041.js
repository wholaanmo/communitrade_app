import { API_BASE_URL } from "../constants/apiConstants";

class RequestService {
  async sendRequest(endpoint, method = "GET", data = null, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Error ${response.status}: ${response.statusText}`
        );
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Convenience methods
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

// Export as singleton instance
export default new RequestService();
