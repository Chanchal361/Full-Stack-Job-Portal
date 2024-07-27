import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/Cloudenary.js";
import getDatauri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    console.log(companyName);
   
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Company Name is required" });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    company = await Company.create({
      name:companyName,
      userId:req.id,
    });   
    res.json({ success: true,company ,message:"Company Register successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "sercver Error while reigster company",
    });
  }
};

// find all company
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id }); // already login
    if (!companies) {
      return res
        .status(404)
        .json({ success: false, message: "No companies found" });
    }
    res.json({ success: true, companies , message:"Successfully fetched companies"});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "server Error while fetching companies",
    });
  }
};

// find one company by id

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    // if (company.userId.toString() !== req.id) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Unauthorized" });
    // }
    return res.status(200).json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "server Error while fetching company",
    });
  }
};

// update company

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileUrl = getDatauri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUrl);
    const logo = cloudResponse.secure_url;
    
    const updataetails = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updataetails,
      { new: true }
    );
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    return res.status(200).json({ success: true, company, message:"company updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "server Error while updating company",
    });
  }
};
