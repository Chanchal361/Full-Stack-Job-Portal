import { Joburl } from "@/components/utils/Api";
import { setAllJobs } from "@/Redux/jobSlic";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);
  // console.log(searchText);
   
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${Joburl}/getalljob?keyword=${searchText}`,{withCredentials:true});
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          // console.log(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);
};
export default useGetAllJobs;
