import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { userFormConfig } from '../config/formConfig';

const UserList = ({ users, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No users found. Add your first user to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {userFormConfig.map((field) => (
              <TableCell key={field.name}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {field.label}
                </Typography>
              </TableCell>
            ))}
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              {userFormConfig.map((field) => (
                <TableCell key={field.name}>
                  {user[field.name] || '-'}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton
                  onClick={() => onEdit(user)}
                  color="primary"
                  size="small"
                  title="Edit user"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(user.id)}
                  color="error"
                  size="small"
                  title="Delete user"
                  sx={{ ml: 1 }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;