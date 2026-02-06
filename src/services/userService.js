import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      }
    );
  }

  async getAllUsers() {
    try {
      const response = await this.api.get('/api/users');
      return response.data;
    } catch {
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id) {
    try {
      const response = await this.api.get(`/api/users/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData) {
    try {
      const response = await this.api.post('/api/users', userData);
      return response.data;
    } catch {
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await this.api.put(`/api/users/${id}`, userData);
      return response.data;
    } catch {
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id) {
    try {
      await this.api.delete(`/api/users/${id}`);
      return true;
    } catch {
      throw new Error('Failed to delete user');
    }
  }
}

const userService = new UserService();
export default userService;
