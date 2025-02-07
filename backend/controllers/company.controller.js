import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;

    if (!companyName || !description || !website || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "This company is already registered",
      });
    }

    let companyLogoUrl = null;

    if (req.files?.companyLogo) {
      const fileUri = getDataUri(req.files.companyLogo[0]); // Fixing array indexing
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);
      companyLogoUrl = cloudRes.secure_url;
    }

    // Creating new company
    company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      userId: req.id,
      logo: companyLogoUrl,
    });

    return res.status(201).json({
      success: true,
      message: "New company registered successfully",
      company,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find();
    if (!companies) {
      return res.status(400).json({
        message: "No company found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = { name, description, website, location };

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
        success: false,
      });
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        company[key] = updateData[key];
      }
    });

    await company.save();

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the company",
      success: false,
    });
  }
};
