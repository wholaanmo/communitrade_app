import { API_BASE_URL } from "../constants/apiConstants";

let mockUsers = [
  {
    id: 1,
    firstName: 'Mai',
    lastName: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
    phoneNumber: '+1234567890',
    createdAt: new Date().toISOString()
  }
];

class RequestService {
  async sendRequest(endpoint, method = "GET", data = null, token = null) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Mock API: ${method} ${endpoint}`, data);
    switch (endpoint) {
      case '/auth/register':
        return this.handleRegister(data);
      
      case '/auth/login':
        return this.handleLogin(data);
      
      case '/admin/users':
        return this.handleGetUsers(token);
      
      case '/admin/req':
        return this.handleGetRequests(token);
      
      default:
        throw new Error(`Mock API: Endpoint ${endpoint} not found`);
    }
  }

  handleRegister(formData) {
    const { email, password, firstName, lastName, username, phoneNumber } = formData;

    if (mockUsers.find(user => user.email === email)) {
      throw new Error('Email already registered');
    }

    if (mockUsers.find(user => user.username === username)) {
      throw new Error('Username already taken');
    }

    const newUser = {
      id: mockUsers.length + 1,
      firstName,
      lastName,
      email,
      username,
      password, // In real app, this would be hashed
      phoneNumber: phoneNumber || '',
      createdAt: new Date().toISOString(),
      emailVerified: false
    };

    mockUsers.push(newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  // Mock login handler
  handleLogin(credentials) {
    const { email, password } = credentials;

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  // Mock get users handler
  handleGetUsers(token) {
    if (!token) {
      throw new Error('Authentication required');
    }

    return mockUsers.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt
    }));
  }

  // Mock get requests handler
  handleGetRequests(token) {
    if (!token) {
      throw new Error('Authentication required');
    }

    // Mock requests data
    return [
      {
        id: 1,
        title: 'Need help with gardening',
        description: 'Looking for someone to help with backyard gardening',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Math tutoring needed',
        description: 'Need help with algebra homework',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
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