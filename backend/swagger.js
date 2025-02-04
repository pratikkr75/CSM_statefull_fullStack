import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Your API Title',  // Change this to your API title
      version: '1.0.0',         // API version
      description: 'API documentation for your Node.js app', // Description
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,  // Adjust this to reflect your dynamic port
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Log the Swagger API docs URL in the console
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
