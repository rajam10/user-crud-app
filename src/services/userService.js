import axios from 'axios';

// For demo purposes, we'll use JSONPlaceholder as a fallback API
// In production, replace this with your actual API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

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
      // Handle different API structures
      const endpoint = API_BASE_URL.includes('jsonplaceholder') ? '/users' : '/api/users';
      const response = await this.api.get(endpoint);
      
      // Transform JSONPlaceholder data to match our structure
      if (API_BASE_URL.includes('jsonplaceholder')) {
        return response.data.slice(0, 5).map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' '),
          phoneNumber: user.phone,
          email: user.email
        }));
      }
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id) {
    try {
      const response = await this.api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData) {
    try {
      const endpoint = API_BASE_URL.includes('jsonplaceholder') ? '/users' : '/api/users';
      const response = await this.api.post(endpoint, userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id, userData) {
    try {
      const endpoint = API_BASE_URL.includes('jsonplaceholder') ? `/users/${id}` : `/api/users/${id}`;
      const response = await this.api.put(endpoint, userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id) {
    try {
      const endpoint = API_BASE_URL.includes('jsonplaceholder') ? `/users/${id}` : `/api/users/${id}`;
      await this.api.delete(endpoint);
      return true;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserService();