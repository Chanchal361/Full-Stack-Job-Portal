import express from "express";
import auth from "../middleware/auth.js";
import {
  getCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyControl.js";
import { singleUpload } from "../middleware/multer.js";

const Companyrouter = express.Router();

// GET all users
// router.route('/users').post(login);
Companyrouter.post("/register", auth, registerCompany);
Companyrouter.get("/get",auth, getCompanies);
Companyrouter.get("/get/:id",auth, getCompanyById);
Companyrouter.put("/update/:id",singleUpload,auth, updateCompany);

export default Companyrouter; 
