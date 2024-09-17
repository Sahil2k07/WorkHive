import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosServerErrorResponse } from "./Login";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { SIGNUP_URL } from "@/data/endPoints";

type InputType = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "Recruiter" | "Student";
  profilePhoto: File | undefined;
};

export default function Signup() {
  const [input, setInput] = useState<InputType>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Student",
    profilePhoto: undefined,
  });

  const navigate = useNavigate();

  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    const loading = toast.loading("SigningUp");

    try {
      const response = await axios.post(SIGNUP_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.dismiss(loading);

        toast.success(response.data.message);

        navigate("/login");
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.dismiss(loading);

      toast.error(error.response?.data.message ?? "Signup Failed");
    }
  };

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, profilePhoto: e.target.files?.[0] });
  };

  const loading = false;
  return (
    <div className="flex flex-col h-screen bg-image">
      <Navbar />
      <div className="flex items-center justify-center flex-grow w-full mx-auto max-w-7xl">
        <form
          onSubmit={signupHandler}
          className="flex flex-col gap-2 p-4 sm:p-8 my-10 bg-white border-2 rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
        >
          <h1 className="mb-5 text-2xl font-bold">Signup with us</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.name}
              name="name"
              onChange={changeEventHandler}
              placeholder="shahil"
              required
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="shahil@gmail.com"
              required
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
              required
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-hiveblue-500"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-hiveblue-500"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col justify-start gap-2 md:flex-row md:items-center">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
                required
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-hivebg-300 hover:bg-hivebg-200 hover:text-hiveblue-300"
            >
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="pl-2 font-semibold text-hiveblue-500">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
