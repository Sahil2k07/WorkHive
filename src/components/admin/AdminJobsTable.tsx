import { formatDate } from "@/data/dateFormatter";
import type { RootState } from "@/redux/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function JobTable() {
  const { allAdminJobs, searchJobByText } = useSelector(
    (state: RootState) => state.job
  );

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-4 ">
      <div className="max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4">
          <h2 className="mb-4 text-2xl font-extrabold text-hivebg-300">
            Recent Posted Jobs
          </h2>
          <div className="overflow-x-auto">
            {filterJobs.length === 0 ? (
              <p className="mt-5 text-lg font-bold text-red-500">
                No jobs found.
              </p>
            ) : (
              <table className="min-w-full text-left table-auto">
                <caption className="mb-2 text-lg font-bold text-gray-600">
                  A list of your recent posted jobs
                </caption>
                <thead>
                  <tr className="font-medium leading-normal text-white uppercase text-md bg-hiveblue-500">
                    <th className="px-6 py-3">Company Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-gray-600 text-md">
                  {filterJobs?.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td className="px-6 py-3 whitespace-nowrap">
                        {job?.company?.name}
                      </td>
                      <td className="px-6 py-3">{job?.title}</td>
                      <td className="px-6 py-3">
                        {formatDate(job.createdAt.toString())}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Popover>
                          <PopoverTrigger>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreHorizontal />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-32 text-white rounded-md bg-hivebg-100">
                            <div
                              onClick={() =>
                                navigate(`/admin/jobs/update/${job.id}`)
                              }
                              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-hivebg-200"
                            >
                              <Edit2 className="w-4" />
                              <span>Edit</span>
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/admin/jobs/applicants/${job.id}`)
                              }
                              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-hivebg-200"
                            >
                              <Eye className="w-4" />
                              <span>Applicants</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
