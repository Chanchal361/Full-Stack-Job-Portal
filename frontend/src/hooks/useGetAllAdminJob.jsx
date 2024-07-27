import { Joburl } from "@/components/utils/Api";
import { setAdminJobs } from "@/Redux/jobSlic";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${Joburl}/getadminjob`,{withCredentials:true}
        );
        if (res.data.success) { 
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, []);
};
export default useGetAllAdminJobs;
