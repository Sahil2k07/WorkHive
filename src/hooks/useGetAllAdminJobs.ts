import { ADMIN_JOBS } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setAllAdminJobs } from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function useGetAllAdminJobs() {
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const response = await axios.get(ADMIN_JOBS, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(
          error.response?.data.message ?? "Problem getting Admin Posted Jobs"
        );
      }
    };

    fetchAdminJobs();
  }, []);
}

export default useGetAllAdminJobs;
