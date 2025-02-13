import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { User } from "../models/user.model.js";
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
    const companyId = req.params.id;
    const userId = req.id;

    let company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    let user = await User.findById(userId);
    if (user.role !== "admin") {
      if (company.userId.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: "You are not authorised to perform this action",
          success: false,
        });
      }
    }

    let logo = company.logo;

    if (req.files && req.files.companyLogo) {
      const logoUri = getDataUri(req.files.companyLogo[0]);
      const cloudResponse = await cloudinary.uploader.upload(logoUri.content);
      logo = cloudResponse.secure_url;
    }

    // Update company details
    company.name = name || company.name;
    company.website = website || company.website;
    company.location = location || company.location;
    company.description = description || company.description;
    company.logo = logo;

    await company.save();
    return res.status(200).json({
      success: true,
      message: "Company details updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company details:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteComapany = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Company ID is required", success: false });
    }
    const company = await Company.findById(id);
    const user = await User.findById(userId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    if (user.role !== "admin") {
      if (company.userId.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: "You are not authorised to perform this action",
          success: false,
        });
      }
    }
    await Company.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Company deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
