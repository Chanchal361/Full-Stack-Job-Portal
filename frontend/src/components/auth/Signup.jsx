import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/Api.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/AuthSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const nagivate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    // confirmPassword: ''
  });

   //  auth when user login then user wont go for login page
   const {user}=useSelector(store=>store.auth)
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileSubmit = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        nagivate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
      return;
    } finally {
      dispatch(setLoading(false));
    }
  };
  // sinuppage auth
  useEffect(()=>{
    if(user){
      nagivate("/")
    }
  },[])
  return (
    <div>
      <div className=" flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
        >
          <p className=" font-bold text-xl mb-5 ">Sign Up</p>
          <div className="my-2">
            <Label>Your Name</Label>
            <Input
              onChange={handleChange}
              name="fullname"
              value={input.fullname}
              type="text"
              placeholder="Your Full Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              onChange={handleChange}
              name="email"
              value={input.email}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              onChange={handleChange}
              name="phoneNumber"
              value={input.phoneNumber}
              type="Number"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              onChange={handleChange}
              name="password"
              value={input.password}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {/* <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="Number" placeholder="Enter your phone number" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="Number" placeholder="Enter your phone number" />
          </div> */}
          <div className=" flex items-center justify-between">
            <RadioGroup className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleChange}
                  className=" cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                onChange={handleFileSubmit}
                type="file"
                accept="image/*"
                className=" cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className=" mr-2 h-4 m-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className=" w-full my-4">
              Signup
            </Button>
          )}
          <span className=" text-sm">
            Already have an account?
            <Link to="/login" className=" text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
