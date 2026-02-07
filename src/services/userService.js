import axios from 'axios';

class UserService {
  constructor() {
    this.getApiUrl = () => process.env.REACT_APP_API_URL || 'http://localhost:3001';
    
    this.api = axios.create({
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
      const apiUrl = this.getApiUrl();
      const endpoint = `${apiUrl}/users`;
      const response = await this.api.get(endpoint);
      
      // Transform JSONPlaceholder data to match our structure
      if (apiUrl.includes('jsonplaceholder')) {
        return response.data.slice(0, 5).map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' ') || 'User',
          phoneNumber: user.phone,
          email: user.email
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id) {
    try {
      const apiUrl = this.getApiUrl();
      const endpoint = `${apiUrl}/users/${id}`; // Simplified for JSONPlaceholder
      const response = await this.api.get(endpoint);
      
      if (apiUrl.includes('jsonplaceholder')) {
        const user = response.data;
        return {
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' ') || 'User',
          phoneNumber: user.phone,
          email: user.email
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData) {
    try {
      const apiUrl = this.getApiUrl();
      const endpoint = `${apiUrl}/users`;
      await this.api.post(endpoint, userData); // Call API, but it won't persist
      
      // For demo purposes with JSONPlaceholder, return mock data
      if (apiUrl.includes('jsonplaceholder')) {
        return { id: Date.now(), ...userData };
      }
      
      return userData; // If not JSONPlaceholder, assume backend returns the created user
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id, userData) {
    try {
      const apiUrl = this.getApiUrl();
      const endpoint = `${apiUrl}/users/${id}`;
      await this.api.put(endpoint, userData); // Call API, but it won't persist
      
      // For demo purposes with JSONPlaceholder, return mock data
      if (apiUrl.includes('jsonplaceholder')) {
        return { id, ...userData };
      }
      
      return userData; // If not JSONPlaceholder, assume backend returns the updated user
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id) {
    try {
      const apiUrl = this.getApiUrl();
      const endpoint = `${apiUrl}/users/${id}`;
      await this.api.delete(endpoint); // Call API, but it won't persist
      
      // For demo purposes with JSONPlaceholder, just return true
      if (apiUrl.includes('jsonplaceholder')) {
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}

const userService = new UserService();
export default userService;
