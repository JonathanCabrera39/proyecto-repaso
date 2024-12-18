
//traer mongoose
const mongoose = require("mongoose");

const app = require("./app");
// leer las variables de entorno
require("dotenv").config();

// traer las variables de entorno
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

const ipServer = process.env.IP_SERVER;
const apiVersion = process.env.API_VERSION;
const port = 3977;


// conectar a la base de datos con mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
  app.listen(port, () => {
      console.log("=============================================");
      console.log("==================API REST -jona 😎-===================");
      console.log("=============================================");
      console.log(`http://${ipServer}:${port}/api/${apiVersion}/`);
    });
  } catch (err) {
    console.log("Error al conectar a la base de datos 👽", err);
  }
};

connectDB();
