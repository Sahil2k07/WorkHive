import { APPLIED_JOBS } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setAllAppliedJobs } from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function useGetAppliedJobs() {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (user?.role === "Student") {
        try {
          const response = await axios.get(APPLIED_JOBS, {
            headers: { Authorization: token },
          });

          dispatch(setAllAppliedJobs(response?.data?.appliedJobs));
        } catch (e) {
          const error = e as AxiosError<AxiosServerErrorResponse>;

          toast.error(
            error.response?.data.message ??
              "Problems getting Applied Jobs Information"
          );
        }
      }
    };

    fetchAppliedJobs();
  }, []);
}

export default useGetAppliedJobs;
