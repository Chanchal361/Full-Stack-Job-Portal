import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/userRoutes.js";
import Companyrouter from "./routes/companyRout.js";
import jobRouter from "./routes/jobRoutes.js";
import Applicationrouter from "./routes/applicatiinRoutes.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:"https://job-hunt-opal.vercel.app", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable cookies in requests
  })
);
// app.use(cors());
// For handling preflight requests
app.options("*", cors());

// routes to find the data
app.use("/api/v1/user", router);
app.use("/api/v1/company", Companyrouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", Applicationrouter);

app.get("/", (req, res) => {
  res.send("Welcome to our World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
