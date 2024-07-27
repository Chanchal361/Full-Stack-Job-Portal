import express from "express";
import auth from "../middleware/auth.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/jobControllers.js";
const jobRouter = express.Router();

// Define a job schema and model
jobRouter.post("/post", auth, postJob);
jobRouter.get("/getalljob", auth, getAllJobs);
jobRouter.get("/get/:id", auth, getJobById);
jobRouter.get("/getadminjob", auth, getAdminJob);

export default jobRouter;
