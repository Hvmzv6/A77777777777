// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv"); // pour lire .env
dotenv.config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cabinet Plus API",
      version: "1.0.0",
      description:
        "Documentation de l API de gestion des formations, formateurs et clients.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js", "./models/**/*.js"], // tu peux adapter selon ta structure
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
