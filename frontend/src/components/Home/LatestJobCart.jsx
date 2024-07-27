import { Badge } from "@/components/ui/badge";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCart = ({ job }) => {

    // const [job,serJob]=useState([])
    const nagivate=useNavigate();
  return (
    <div
     onClick={()=>nagivate(`/description/${job?._id}`)}
    className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
      <div className=" flex gap-3">
        <img className=" object-cover" src={job?.company?.logo} height={40} width={40} alt="" />
        <div>
          <h1 className="font-medium text-2xl">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCart;
