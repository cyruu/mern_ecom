import express from "express";
import connect from "./config/dbConfig.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
connect();

const app = express();

// middleware
app.use(morgan("dev"));

// importing routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/users", userRoutes);

app.listen(3000, () => {
  console.log("server running at port: 3000");
});
