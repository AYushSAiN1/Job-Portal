import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      opening,
      companyId,
      position,
      experience,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !position ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !opening ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        message: "All fiels are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      position,
      requirements: requirements.split(/\n/).map((req) => req.trim()),
      salary: Number(salary),
      location,
      jobType,
      opening: Number(opening),
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const q = req.query.q || "";
    const query = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    };

    const job = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!job) {
      return res.status(404).json({
        message: "No job found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({ path: "applications" });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job found",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobs = await Job.find({ created_by: userId });
    if (!jobs) {
      return res.status(404).json({
        message: "No job found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const updates = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(401).json({
        message: "You are not authorized",
        success: false,
      });
    }

    Object.keys(updates).forEach((key) => {
      if (job[key] !== undefined) {
        job[key] = updates[key];
      }
    });

    await job.save();
    return res.status(200).json({
      message: "Job updated",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};
