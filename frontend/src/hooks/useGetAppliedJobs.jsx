import { applicantUrl } from "@/components/utils/Api";
import { setAllAppliedJobs } from "@/Redux/jobSlic";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${applicantUrl}/getappliedjobs`
        );
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
