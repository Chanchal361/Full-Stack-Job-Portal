import React, { useEffect, useState } from "react";
import JobFilterCard from "./JobFilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJob] = useState(allJobs);
  console.log(filterJobs);
  console.log(searchText);
  useEffect(() => {
    if (searchText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job?.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterJob(filteredJobs);
    } else {
      setFilterJob(allJobs);
    }
  }, [allJobs, searchText]);
  return (
    <div className=" max-w-7xl mx-auto mt-5">
      <div className=" flex gap-5">
        <div className="w-[20%]">
          <JobFilterCard />
        </div>
        {filterJobs.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className=" grid grid-cols-3 gap-4">
              {
              filterJobs.map((item, index) => (
                <motion.div 
                initial={{opacity: 0,x:100}}
                animate={{opacity: 1,x:0}}
                transition={{duration: 0.5}}
                exit={{opacity:0,x:100}}
                key={index}>
                  
                  <Job item={item} />
                </motion.div>
              ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
