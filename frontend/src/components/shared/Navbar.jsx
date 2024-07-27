import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../utils/Api";
import { setUser } from "@/Redux/AuthSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${url}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        nagivate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };
  return (
    <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
      <div>
        <Link to="/">
          <p className=" text-2xl font-bold cursor-pointer">
            Job<span className="text-[#f83002]">Portal</span>
          </p>
        </Link>
      </div>
      <div className=" flex items-center gap-4">
        <ul className=" flex font-medium items-center gap-5">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies">
                <li>Companies</li>
              </Link>
              <Link to="admin/jobs">
                <li>Jobs</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/jobs">
                <li>Job</li>
              </Link>
              <Link to="/browse">
                <li>Browse</li>
              </Link>
            </>
          )}
        </ul>

        <div>
          {!user ? (
            <div className=" flex gap-2 items-center">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button className="bg-[#6A38C2] hover:bg-[#401885] ">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className=" flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className=" text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                {/* change according roles  */}
                <div className=" flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className=" flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className=" flex gap-2 w-fit items-center cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Log out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
