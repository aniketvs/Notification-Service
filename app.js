const express = require("express");
const app = express();
const routes = require('./routes/routes');
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/config");
const { initRedis } = require('./config/redisConfig');
app.use(cors());
app.use(express.json());
app.use("/api/notification", routes);

app.get("/health", (req, res) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (err) {
    console.log("Error in getting data", err);
    res.status(500).send("Internal Server Error");
  }
});


const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true }); // Will check and modify table if needed
    console.log('Database synced successfully.');
    await initRedis();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();
