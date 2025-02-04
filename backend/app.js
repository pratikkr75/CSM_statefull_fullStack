import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js'; // Import the connectDB function
import claimRoutes from './routes/claimRoutes.js';
import policyRoutes from './routes/policyRoutes.js';
import policyholderRoutes from './routes/policyholderRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';


// Import Swagger configuration
import swaggerDocs from './swagger.js';  // Import the Swagger setup

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/api/claims', claimRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/policyholders', policyholderRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Setup Swagger Docs
swaggerDocs(app, process.env.PORT || 5000);  // Initialize Swagger UI at /api-docs

export default app;
