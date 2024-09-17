import type { AppDispatch, RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AxiosServerErrorResponse } from "../Login";
import { toast } from "sonner";
import { GET_APPLICANTS } from "@/data/endPoints";
import { setAllApplicants } from "@/redux/slices/applicationSlice";
import Navbar from "@/components/common/Navbar";
import ApplicantsTable from "@/components/admin/ApplicantsTable";

export default function () {
  const { id = "" } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { applicants } = useSelector((state: RootState) => state.application);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${GET_APPLICANTS}/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          dispatch(setAllApplicants(response.data.applicants));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(
          error.response?.data.message ?? "Problem getting All Applicants"
        );
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />
      <div className="flex flex-col w-full gap-4 px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
        <h1 className="my-5 text-2xl font-extrabold text-gray-900">
          Applicants ({applicants.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}
