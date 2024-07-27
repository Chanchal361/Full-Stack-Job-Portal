import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/Api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/Redux/AuthSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
    //  auth when user login then user wont go for login page
    const {user}=useSelector(store=>store.auth)
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        nagivate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return;
    } finally {
      dispatch(setLoading(false));
    }
  };
  //  calling login page
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
          <p className="font-bold text-xl mb-5 ">Login</p>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              name="password"
              value={input.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
            />
          </div>
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
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  className=" cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className=" mr-2 h-4 m-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className=" w-full my-4">
              Login
            </Button>
          )}
          <span className=" text-sm">
            Dont't have an account?
            <Link to="/signup" className=" text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
