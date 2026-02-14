import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();
console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Sucess from api",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting DB💥");
  }
};

startServer();
