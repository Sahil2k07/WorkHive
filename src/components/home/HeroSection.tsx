import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/slices/jobSlice";

export default function () {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      dispatch(setSearchQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="px-4 pb-2 text-center text-white lg:px-0 bg-hivebg-200">
      <div className="flex flex-col max-w-5xl gap-10 mx-auto my-10">
        <span className=" mx-auto text-xs md:text-base  px-4 py-2 rounded-md bg-gray-100 text-[#5072A7] font-bold">
          Your #1 Career Gateway
        </span>
        <h1 className="font-sans text-4xl font-extrabold md:text-6xl">
          Search, Apply & Build the{" "}
          <span className="text-hiveblue-300">Career you Deserve</span>
        </h1>
        <p className="font-sans text-sm font-medium md:text-xl text-wrap text-slate-300">
          Connect with the right jobs or find the perfect candidate. Join
          WorkHive today to kickstart your career or discover top talent
          effortlessly.
        </p>
        <div className="flex w-[70%] sm:w-[55%] md:w-[40%] shadow-lg  text-black bg-white pl-3 rounded-md items-center gap-4 mx-auto">
          <input
            type="text"
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none outline-none"
          />
          <Button
            type="submit"
            onClick={searchJobHandler}
            className="rounded-sm bg-hiveblue-300"
          >
            <Search className="w-4 h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
