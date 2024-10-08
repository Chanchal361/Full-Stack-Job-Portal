import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, 
    location: {
      type: String,
      required: true,
    }, 
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    requirements:[{
      type: String,
      required: true,
    }],
    exprienceLeval:{
      type:Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    create_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
