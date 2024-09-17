import { formatDate } from "@/data/dateFormatter";
import { UPDATE_STATUS } from "@/data/endPoints";
import { AxiosServerErrorResponse } from "@/pages/Login";
import { RootState } from "@/redux/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios, { AxiosError } from "axios";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function () {
  const { applicants } = useSelector((state: RootState) => state.application);
  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const statusHandler = async (status: "Accepted" | "Rejected", id: string) => {
    const loading = toast.loading("Updating Status");

    try {
      const response = await axios.put(
        `${UPDATE_STATUS}/${id}`,
        { status },
        { headers: { Authorization: token } }
      );

      if (response.data.success) {
        toast.dismiss(loading);

        navigate(0);

        toast.success(response.data.message);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.dismiss(loading);

      toast.error(error.response?.data.message ?? "Unable to Update Status");
    }
  };

  return (
    <div className="px-6 py-4 overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <caption className="p-4 text-lg font-bold text-left text-gray-700">
          A list of your recent applicants
        </caption>
        <thead className="text-sm font-bold text-white uppercase bg-hiveblue-500">
          <tr>
            <th className="px-6 py-3 tracking-wider text-left">Name</th>
            <th className="px-6 py-3 tracking-wider text-left ">Email</th>
            <th className="px-6 py-3 tracking-wider text-left ">Contact</th>
            <th className="px-6 py-3 tracking-wider text-left ">Resume</th>
            <th className="px-6 py-3 tracking-wider text-left ">Date</th>
            <th className="px-6 py-3 tracking-wider text-left ">Status</th>
            <th className="px-6 py-3 tracking-wider text-right ">Action</th>
          </tr>
        </thead>
        <tbody className="font-medium bg-white divide-x divide-gray-200">
          {applicants &&
            applicants.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item?.applicant?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item?.applicant?.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item?.applicant?.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {formatDate(item.createdAt.toString())}
                </td>
                <td
                  className={`px-6 font-bold py-4 text-sm whitespace-nowrap ${
                    item.status === "Accepted"
                      ? "text-green-600"
                      : item.status === "Rejected"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <Popover>
                    <PopoverTrigger>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="z-10 w-32 bg-white rounded-md shadow-lg">
                      <div className="flex flex-col text-white bg-hivebg-200">
                        <button
                          type="button"
                          onClick={() => statusHandler("Accepted", item.id)}
                          className="p-2 text-sm text-centercursor-pointer hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => statusHandler("Rejected", item.id)}
                          className="p-2 text-sm text-center cursor-pointer hover:bg-red-500 "
                        >
                          Reject
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
