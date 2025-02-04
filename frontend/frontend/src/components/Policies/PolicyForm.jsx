import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar,
  Paper,
  MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const PolicyForm = ({ onSubmitSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    policyholderId: '',
    policyAmount: '',
    status: 'active',
    startDate: new Date()
  });

  // Error and success message states
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'expired', label: 'Expired' }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData(prev => ({
      ...prev,
      startDate: newDate
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.policyholderId.trim()) {
      newErrors.policyholderId = 'Policyholder ID is required';
    }
    
    if (!formData.policyAmount || formData.policyAmount <= 0) {
      newErrors.policyAmount = 'Valid policy amount is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create policy');
      }

      setSnackbar({
        open: true,
        message: 'Policy created successfully!',
        severity: 'success'
      });

      // Reset form
      setFormData({
        policyholderId: '',
        policyAmount: '',
        status: 'active',
        startDate: new Date()
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        New Policy
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="policyholderId"
          label="Policyholder ID"
          name="policyholderId"
          value={formData.policyholderId}
          onChange={handleChange}
          error={!!errors.policyholderId}
          helperText={errors.policyholderId}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="policyAmount"
          label="Policy Amount"
          name="policyAmount"
          type="number"
          value={formData.policyAmount}
          onChange={handleChange}
          error={!!errors.policyAmount}
          helperText={errors.policyAmount}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="status"
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={!!errors.status}
          helperText={errors.status}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Policy
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PolicyForm;