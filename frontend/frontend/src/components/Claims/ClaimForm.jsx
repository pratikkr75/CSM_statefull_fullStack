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

const ClaimForm = ({ onSubmitSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    policyId: '',
    claimAmount: '',
    status: 'pending',
    filingDate: new Date()
  });

  // Error and success message states
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
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
      filingDate: newDate
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.policyId.trim()) {
      newErrors.policyId = 'Policy ID is required';
    }
    
    if (!formData.claimAmount || formData.claimAmount <= 0) {
      newErrors.claimAmount = 'Valid claim amount is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    if (!formData.filingDate) {
      newErrors.filingDate = 'Filing date is required';
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
      const response = await fetch('https://csm-stateful-backend.onrender.com/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create claim');
      }

      setSnackbar({
        open: true,
        message: 'Claim created successfully!',
        severity: 'success'
      });

      // Reset form
      setFormData({
        policyId: '',
        claimAmount: '',
        status: 'pending',
        filingDate: new Date()
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
        New Claim
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="policyId"
          label="Policy ID"
          name="policyId"
          value={formData.policyId}
          onChange={handleChange}
          error={!!errors.policyId}
          helperText={errors.policyId}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="claimAmount"
          label="Claim Amount"
          name="claimAmount"
          type="number"
          value={formData.claimAmount}
          onChange={handleChange}
          error={!!errors.claimAmount}
          helperText={errors.claimAmount}
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
            label="Filing Date"
            value={formData.filingDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                error={!!errors.filingDate}
                helperText={errors.filingDate}
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
          Create Claim
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

export default ClaimForm;
