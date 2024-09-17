import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { setLoading, setToken, setUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { LOGIN_URL } from "@/data/endPoints";

export type AxiosServerErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.email.length <= 0 || input.password.length <= 0) {
      toast.error("Enter Email & Password");

      return;
    }

    const loading = toast.loading("Logging In");

    try {
      dispatch(setLoading(true));

      const response = await axios.post(LOGIN_URL, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));

        dispatch(setToken(response.data.token));

        toast.dismiss(loading);

        toast.success("Login Successfull");

        navigate("/");
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.dismiss(loading);

      toast.error(error?.response?.data?.message ?? "Login Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="flex flex-col h-screen bg-slate-200">
      <Navbar />
      <div className="flex items-center justify-center flex-grow mx-auto max-w-7xl">
        <form
          onSubmit={submitHandler}
          className="p-8 bg-white border-2 rounded-lg w-max shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
        >
          <h1 className="mb-5 text-xl font-bold">Login</h1>
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
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Your Password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-hiveblue-300"
                  required
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
                  className="cursor-pointer accent-hiveblue-300"
                  required
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-hivebg-300 hover:bg-hivebg-200">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-hivebg-300 hover:bg-hivebg-200 hover:text-hiveblue-300"
            >
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="pl-1 font-semibold text-hiveblue-400">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
