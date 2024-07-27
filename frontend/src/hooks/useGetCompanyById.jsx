import { companyUrl } from "@/components/utils/Api";
import { setSingleCompany } from "@/Redux/CompanySlice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(
          `${companyUrl}/get/${id}`,{withCredentials:true}
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error occured while fetching company details", error);
      }
    };
    fetchCompanyDetails();
  }, [id, dispatch]);
};
export default useGetCompanyById;
