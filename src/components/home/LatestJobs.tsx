import { useSelector } from "react-redux";
import LatestJobsCard from "./LatestJobsCard";
import { RootState } from "@/redux/store";

export default function () {
  const { allJobs } = useSelector((state: RootState) => state.job);
  return (
    <section className="w-full px-6 sm:px-4 bg-slate-100">
      <div className="w-full py-12 mx-auto my-10 max-w-7xl">
        <h1 className="font-sans text-2xl font-bold md:text-4xl">
          <span className="text-hiveblue-300">Latest & Top </span> Job Openings
        </h1>
        <div className="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.length <= 0 ? (
            <span className="text-2xl font-medium text-red-500">
              No Jobs Available
            </span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobsCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
}
