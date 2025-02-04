import React from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleAddPolicyholder = () => {
    navigate('/add-policyholder');
  };

  const handleAddClaim = () => {
    navigate('/add-claim');
  };

  const handleAddPolicy = () => {
    navigate('/add-policy');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Claim Management System
        </Typography>
        
        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
          sx={{ mt: 4 }}
        >
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddPolicyholder}
              sx={{
                py: 3,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
            >
              Policyholder +
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddClaim}
              sx={{
                py: 3,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Claim +
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddPolicy}
              sx={{
                py: 3,
                backgroundColor: '#ed6c02',
                '&:hover': {
                  backgroundColor: '#e65100'
                }
              }}
            >
              Policy +
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;