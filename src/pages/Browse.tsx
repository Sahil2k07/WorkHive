import Job from "@/components/browse/Job";
import Navbar from "@/components/common/Navbar";
import useGetJobs from "@/hooks/useGetJobs";
import { setSearchQuery } from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  useGetJobs();

  const { allJobs } = useSelector((state: RootState) => state.job);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div className="h-screen bg-slate-200">
      <Navbar />
      <div className="mx-auto my-10 max-w-7xl">
        <h1
          className={`my-10 text-xl font-bold ${
            allJobs.length === 0 ? "text-red-500" : ""
          }`}
        >
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
}
