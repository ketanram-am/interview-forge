import express from "express";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
const app = express();
// console.log(ENV.PORT);
// console.log(ENV.DB_URL);

//middleware

app.use(express.json());
// credentials:true means ==> Server allows a browser to include cookies on req
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

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
