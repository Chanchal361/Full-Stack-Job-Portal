import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProctedRoutes = ({children}) => {

    const{user}=useSelector(store=>store.auth);
    console.log(user)
    const nagivate=useNavigate();
    useEffect(()=>{
        if(user===null || user.role!=="recruiter"){
          nagivate("/");
        }
    },[]);
  return (
    <div>
      {children}
    </div>
  )
}

export default ProctedRoutes
