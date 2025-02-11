import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const createApplication = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId)
      return res
        .status(400)
        .json({ message: "Job id is required", success: false });

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication)
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });

    //if job does not exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(application._id);

    await job.save();

    return res
      .status(201)
      .json({ message: "Applied for the job.", application, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getApplications = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      })
      .sort({ createdAt: -1 });
    if (!applications) {
      return res.status(404).json({
        message: "No application found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All applications",
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const applicants = job.applications.map((application) => {
      return {
        _id: application._id,
        fullname: application.applicant.fullname,
        email: application.applicant.email,
        status: application.status,
        resume: application.applicant.profile.resume,
        avatar: application.applicant.profile.profilePhoto,
      };
    });

    return res.status(200).json({
      message: "All applicants",
      applicants,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
