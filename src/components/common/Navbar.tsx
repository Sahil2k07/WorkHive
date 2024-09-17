import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { LOGOUT_URL } from "@/data/endPoints";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/authSlice";
import { useState } from "react";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(LOGOUT_URL);

      if (response.data.success) {
        toast.success(response.data.message);

        dispatch(setUser(null));

        navigate("/");
      }
    } catch (e) {
      toast.error("Unable to LogOut");
    }
  };

  return (
    <div className="relative bg-hivebg-300">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white sm:hidden"
          >
            <Menu size={24} />
          </button>
          <Link to="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer">
              Work<span className="text-hiveblue-300 ">Hive</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <ul className="items-center hidden gap-5 font-medium text-white sm:flex">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:text-hiveblue-300">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-hiveblue-300">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-hiveblue-300">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-hiveblue-300">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-hiveblue-300">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User profile"
                    width={35}
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="z-50 p-4 text-white border-2 rounded-md w-80 bg-hivebg-100 border-hivebg-300">
                <div>
                  <div className="flex items-center gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User profile"
                        width={55}
                        className="rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{user.name}</h4>
                      <p className="text-sm text-gray-300">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-slate-100">
                    {user && (
                      <div className="flex items-center cursor-pointer w-fit">
                        <User2 />
                        <Button variant="link" className="text-slate-100">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center text-red-500 cursor-pointer w-fit">
                      <LogOut />
                      <Button
                        variant="link"
                        onClick={logoutHandler}
                        className="text-red-500"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="font-bold">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="hidden font-bold bg-hiveblue-300 hover:bg-hiveblue-500 sm:flex">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-hivebg-300 bg-opacity-90 sm:hidden">
          <div className="flex flex-col h-full min-h-screen gap-4 p-6 bg-hivebg-300">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white cursor-pointer">
                Work<span className="text-hiveblue-300 ">Hive</span>
              </h1>

              <X
                onClick={() => setIsMenuOpen(false)}
                className="text-white"
                size={30}
              />
            </div>

            <ul className="mt-8 space-y-6 text-lg font-medium text-white">
              {user && user.role === "Recruiter" ? (
                <>
                  <li className="hover:text-hiveblue-300">
                    <Link
                      to="/admin/companies"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li className="hover:text-hiveblue-300">
                    <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-hiveblue-300">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li className="hover:text-hiveblue-300">
                    <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                  <li className="hover:text-hiveblue-300">
                    <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="mt-8 space-y-6 text-lg font-medium text-white">
              {user ? (
                <>
                  <li className="flex items-center space-x-6">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User profile"
                        width={35}
                        className="rounded-full"
                      />
                    </Avatar>
                    <Link
                      to="/profile"
                      className="text-lg"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      View Profile
                    </Link>
                  </li>
                  <li className="text-red-500">
                    <Button
                      variant="link"
                      onClick={logoutHandler}
                      className="text-red-500"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <div className="flex gap-8">
                  <li>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="font-bold text-gray-800"
                      >
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="font-bold bg-hiveblue-300 hover:bg-hiveblue-500">
                        Signup
                      </Button>
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
