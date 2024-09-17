import Job from "@/components/browse/Job";
import Navbar from "@/components/common/Navbar";
import FilterCard from "@/components/job/FilterCard";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function () {
  const { allJobs, searchQuery } = useSelector((state: RootState) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }

    return () => {
      setFilterJobs(allJobs);
    };
  }, [allJobs, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <div className="fixed top-0 left-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="flex flex-grow pt-[64px] gap-2 sm:gap-4">
        <div className="w-[30%] max-w-xs fixed top-[64px] left-0 min-h-[calc(100vh-64px)] overflow-y-auto z-40">
          <FilterCard />
        </div>

        <div className="w-full ml-[30%] xl:ml-[25%] pt-3 max-w-7xl overflow-y-auto">
          {filterJobs.length <= 0 ? (
            <span className="flex mt-10 text-3xl font-bold text-red-500">
              No Results !
            </span>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {filterJobs.map((job) => (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?.id}
                  >
                    <Job job={job} />
                  </motion.div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
