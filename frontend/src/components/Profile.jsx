import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplicationTable from "./ApplicationTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
const skill = ["java", "python", "react js", "redux"];
const Profile = () => {
  useGetAppliedJobs()
  const resume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <div className=" max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className=" flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile Picture" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullname}</h1>
              <p className="text-sm">{user.profile.bio}r</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div>
          <div className=" flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>

          <div className=" flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="my-5">
          <h2>Skills</h2>
          <div className="flex items-center gap-1">
            {
           user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>
        <div className=" grid w-full max-w-sm items-center gap-1">
          <Label className="text-md font-bold">Resume</Label>
          {resume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="w-full text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
        <ApplicationTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
