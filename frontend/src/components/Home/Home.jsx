import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LetestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  useGetAllJobs();
  const {user}= useSelector(store=>store.auth);
  const nagivate = useNavigate();
  useEffect(()=>{
    if(user?.role==='recruiter'){
      nagivate('/admin/companies');
    }
  },[])
  return (
    <div>
      
      <HeroSection />
      <CategoryCarousel /> 
      <LetestJob />
      <Footer />
    </div>
  );
};

export default Home;
