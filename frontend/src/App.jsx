import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import Jobs from "./components/Jobs/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/Jobs/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicant from "./components/admin/Applicant";
import ProctedRoutes from "./components/admin/ProctedRoutes";
function App() {
  return (
    <>
      <div>
        {/* all of thes student only  */}
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/description/:id" element={<JobDescription />} />
          {/* starts admin  side  */}
          <Route
            path="/admin/companies"
            element={
              <ProctedRoutes>
                <Companies />
              </ProctedRoutes>
            }
          />
          <Route path="/admin/jobs" element={<AdminJobs />} />

          <Route
            path="/admin/companies/create"
            element={
              <ProctedRoutes>
                <CompanyCreate />
              </ProctedRoutes>
            }
          />
          <Route path="/admin/job/create" element={<PostJobs />} />

          <Route path="/admin/companies/:id" element={<CompanySetup />} />
          <Route path="/admin/job/:id/applicant" element={<Applicant />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
