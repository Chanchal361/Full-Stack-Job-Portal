import { applicantModel } from "../models/applicantModel.js";
import { Job } from "../models/jobModel.js";

export const applyJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "job id required", success: false });
    }
    const jobapplied = await applicantModel.findOne({
      job: jobId,
      applicant: userId,
    });

    if (jobapplied) {
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false,
      });
    }
    // chechk if the job is already
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    // create a new job
    const newApplication = await applicantModel.create({
      applicant: userId,
      job: jobId,
    });
    job.application.push(newApplication._id);
    await job.save();
    res.status(201).json({
      message: "application applied successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

// get all applications details

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await applicantModel
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res
        .status(404)
        .json({ message: "no applications found", success: false });
    }

    return res.status(200).json({
      message: "applications fetched successfully",
      success: true,
      applications,
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

// admin see the how many jobs apply

export const getJobsApplications = async (req, res) => {
  try {
    const jobId =req.params.id;

    const application = await Job.findById(jobId).populate({   
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!application) {
      return res
        .status(404)
        .json({
          message: "no applications found for this job",
          success: false,
        });
    }
    return res.status(200).json({
      message: "applications fetched successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

// update application 

    export const updateStatus = async (req, res) => {
      try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
          return res
           .status(400)
           .json({ message: "status required", success: false });
        }
        const application = await applicantModel.findOne({_id: applicationId});
        if (!application) {
          return res
            .status(404)
            .json({ message: "application not found", success: false });
        }
        // update application
        application.status = status.toLowerCase();
        await application.save();

  
        return res.status(200).json({
          message: "application status updated successfully",
          success: true,
          application,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error", success: false });
      }
    };