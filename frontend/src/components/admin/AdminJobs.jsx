import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJob";
import { setSearchJobByText } from "@/Redux/jobSlic";


const AdminJobs = () => {
    useGetAllAdminJobs();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(text));
  }, [text]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-fit"
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/job/create")}>
            Post New Job
          </Button> 
        </div>
        <AdminJobTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
