import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { formatDate } from "@/data/dateFormatter";

export default function AppliedJobsTable() {
  const { allAppliedJobs } = useSelector((state: RootState) => state.job);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <caption className="mb-4 text-lg font-semibold">
            A list of your applied jobs
          </caption>
          <thead>
            <tr>
              <th className="p-2 text-left text-white border bg-hiveblue-500">
                Date
              </th>
              <th className="p-2 text-left text-white border bg-hiveblue-500">
                Job Role
              </th>
              <th className="p-2 text-left text-white border bg-hiveblue-500">
                Company
              </th>
              <th className="p-2 text-right text-white border bg-hiveblue-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.length <= 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  You haven't applied for any job yet.
                </td>
              </tr>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <tr key={appliedJob.id}>
                  <td className="p-2 border whitespace-nowrap">
                    {formatDate(appliedJob.createdAt.toString())}
                  </td>
                  <td className="p-2 border whitespace-nowrap">
                    {appliedJob.job?.title}
                  </td>
                  <td className="p-2 border whitespace-nowrap">
                    {appliedJob.job?.company?.name}
                  </td>
                  <td className="p-2 text-right border">
                    <span
                      className={`p-1 rounded text-white ${
                        appliedJob?.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : appliedJob.status === "Pending"
                          ? "bg-gray-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
