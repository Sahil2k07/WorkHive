import { GET_JOBS } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setAllJobs } from "@/redux/slices/jobSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function useGetJobs() {
  const dispatch = useDispatch<AppDispatch>();

  const { searchQuery } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${GET_JOBS}?keyword=${searchQuery}`);

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;
        toast.error(error.response?.data.message ?? "Problems getting Jobs");
      }
    };

    fetchJobs();
  }, [searchQuery]);
}

export default useGetJobs;
