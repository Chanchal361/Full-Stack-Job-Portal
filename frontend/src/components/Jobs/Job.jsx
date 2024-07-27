import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookMarked, BookMarkedIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({item}) => {
  const nagivate = useNavigate();

  const dayAgoFunction=(mongoTime)=>{
     const createdAt =new Date(mongoTime)
     const currentTime=new Date();
     const timeDiff=currentTime-createdAt;
     return Math.floor(timeDiff/(1000*24*60*60))
  }

  return (
    <div className=" p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className=" flex items-center justify-between"> 
        <p className="text-sm text-gray-500">{ item?.createdAt == 0 ? ("today"):`${dayAgoFunction(item?.createdAt)} days ago`}</p>
        <Button variant="outline " className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className=" flex items-center gap-2 my-2">
        <Button variant="outline" size="icon" className="p-6">
          <Avatar>
            <AvatarImage 
            // className=" object-cover"
            src={item?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h2 className=" font-medium text-lg ">{item?.company?.name}</h2>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <p className=" font-bold text-lg my-2">{item?.title}</p>
        <p className=" text-sm text-gray-500">
          {item?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {item?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {item?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {item?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => nagivate(`/description/${item?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
