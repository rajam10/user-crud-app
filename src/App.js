import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { Add } from '@mui/icons-material';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ConfirmDialog from './components/ConfirmDialog';
import userService from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const userData = await userService.getAllUsers();
      setUsers(userData);
      setError('');
    } catch (error) {
      setError('Failed to load users. Please check your internet connection.');
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleFormSubmit = async (userData) => {
    setLoading(true);
    try {
      if (editingUser) {
        // Update existing user
        const { id, ...dataToUpdate } = userData;
        await userService.updateUser(editingUser.id, dataToUpdate);
        
        // Update in local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === editingUser.id ? { ...user, ...userData } : user
          )
        );
        
        showNotification('User updated successfully!');
      } else {
        // Create new user
        const newUser = await userService.createUser(userData);
        console.log(newUser);
        const userDataNew = await userService.getAllUsers();
        setUsers(userDataNew);
        setError('');
        // Add to local state
        //setUsers(prevUsers => [...prevUsers, newUser]);
        
        showNotification('User created successfully!');
      }
      
      setFormOpen(false);
      setEditingUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setDeleteDialog({ open: true, userId });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await userService.deleteUser(deleteDialog.userId);
      
      // Remove from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== deleteDialog.userId));
      
      showNotification('User deleted successfully!');
      setDeleteDialog({ open: false, userId: null });
    } catch (error) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          User Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Manage your users with full CRUD operations
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddUser}
          sx={{ mt: 2 }}
        >
          Add New User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        loading={loading}
      />

      <UserForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleFormSubmit}
        user={editingUser}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, userId: null })}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={loading}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;