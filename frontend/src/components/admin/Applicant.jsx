import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import ApplicantsTable from "./ApplicantsTable";
import { applicantUrl } from "../utils/Api";
import { setApplicants } from "@/Redux/applicationSlice";

const Applicant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        // axios.defaults.withCredentials = true;
        const res = await axios.get(`${applicantUrl}/${params.id}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplicants(res.data.application));
        }
        // dispatch(setApplicants(res.data.application));
        // console.log(res.data.application)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-medium text-xl my-5">
          Applicants ({applicants?.application.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicant;
