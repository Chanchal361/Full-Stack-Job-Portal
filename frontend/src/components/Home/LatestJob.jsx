import { Badge } from "@/components/ui/badge";
import React from "react";
import { useSelector } from "react-redux";
import LatestJobCart from "./LatestJobCart";
const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className=" max-w-7xl mx-auto my-20">
      <p className=" text-4xl font-bold">
        Letest&Top <span className=" text-[#6A38C2]">Job Opening</span>{" "}
      </p>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Found</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job, index) => <LatestJobCart job={job} key={index} />)
        )}
      </div>
    </div>
  );
};

export default LatestJob;
