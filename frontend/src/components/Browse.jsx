import React, { useEffect } from 'react'
import Job from './Jobs/Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchText } from '@/Redux/jobSlic';
const Browse = () => {
  const dispatch=useDispatch();
  const{allJobs}=useSelector(store=>store.job);
   useGetAllJobs();

   useEffect(()=>{
      return ()=>{
        dispatch(setSearchText(""));
      }
   })
  return (
    <div className=' max-w-7xl mx-auto my-10'>
      <h1 className="font-bold text-xl my-10">Search Result ({allJobs.length})</h1>
       <div className=' grid grid-cols-3 gap-4 '>
         {
            allJobs.map((job, index) => (
              <div key={index}>
                <Job item={job} />
              </div>
            ))
 
         }
       </div>

    </div>
  )
}

export default Browse
