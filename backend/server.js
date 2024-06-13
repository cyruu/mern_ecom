import express from "express";
import connect from "./config/dbConfig.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
connect();

const app = express();

// middleware
app.use(morgan("dev"));
// terminal ma req.body log garna ko lai
app.use(express.json());
// importing routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`hello ${req.path}`);
});

app.listen(3000, () => {
  console.log("server running at port: 3000");
});
