import { companyUrl } from "@/components/utils/Api";
import { setCompanies } from "@/Redux/CompanySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${companyUrl}/get`,{withCredentials:true}
        );
        dispatch(setCompanies(res.data.companies));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, []);
};
export default useGetCompanies;
