import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "@/Redux/jobSlic";
// import { useSelector } from "react-redux";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const nagivate = useNavigate();
  
  const searchJobHandler = () => {
    dispatch(setSearchText(query));
    nagivate("/browse");
  };
  // const {searchText}=useSelector(store=>store.job)
  // console.log(searchText)
  return (
    <div className="text-center">
      <div className="flex flex-col gap-4 my-2">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium  ">
          No 1. Job Hunt Website
        </span>
        <h2 className="text-5xl font-bold">
          Search,Apply & <br /> Get Your{" "}
          <span className="text-[#6A38c2]">Dream Jobs</span>
        </h2>

        <div className="flex w-[40%] shadow-lg border pl-3 border-gray-200 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
