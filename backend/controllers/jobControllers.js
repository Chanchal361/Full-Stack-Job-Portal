import { Job } from "../models/jobModel.js";
//  admin post job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      jobType,
      requirements,
      exprienceLeval,
      companyId,
      position,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !location ||
      !jobType ||
      !requirements ||
      !exprienceLeval ||
      !salary ||
      !companyId ||
      !position
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      jobType,
      requirements: requirements.split(","),
      exprienceLeval,
      company:companyId,
      create_by: userId,
      position,
    });
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error creating job" });
  }
};

// get all request

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        //   { location: { $regex: keywords, $options: "i" } },
        //   { company: { $regex: keywords, $options: "i" } },
        //   { position: { $regex: keywords, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path: "company"
  }).sort({createdAt:-1})
    if (!jobs) {
      return res.status(404).json({ success: false, message: "No jobs found" }); // return 404 if no job found
    }
    return res
      .status(200)
      .json({ success: true, message: "Jobs fetched successfully", jobs });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error getting jobs" });
  }
};

// find by id studet

export const getJobById = async (req, res) => {
  try {
    // const userId = req.id;
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"application"
    });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" }); // return 404 if no job found
    }
    return res.status(200).json({ success: true, message: "Job fetched", job });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error getting job" });
  }
};

// how job created by admin
export const getAdminJob = async (req, res) => {
  try { 
    const userId = req.id;
    const jobs = await Job.find({ create_by: userId}).populate({
      path:"company"
    });
    if (!jobs) {
      return res.status(404).json({ success: false, message: "No jobs found" }); // return 404 if no job found
    }
    return res
      .status(200)
      .json({ success: true, message: "Jobs fetched successfully", jobs });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error getting jobs" });
  }
};
