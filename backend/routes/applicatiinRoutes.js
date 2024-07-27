import express from 'express';
import auth from '../middleware/auth.js';
import { applyJobs, getAppliedJobs, getJobsApplications, updateStatus } from '../controllers/applicationControl.js';

const Applicationrouter = express.Router();

// Route to create a new post
Applicationrouter.get("/apply/:id",auth,applyJobs);
Applicationrouter.get("/getappliedjobs",auth,getAppliedJobs);
Applicationrouter.get("/:id/applicants",auth,getJobsApplications);
Applicationrouter.post("/status/:id/update",auth,updateStatus)

export default Applicationrouter;