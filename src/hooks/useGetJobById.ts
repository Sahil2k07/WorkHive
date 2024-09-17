import { GET_JOB } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setSingleJob } from "@/redux/slices/jobSlice";
import type { AppDispatch } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function useGetJobById(id: string) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${GET_JOB}/${id}`);

        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(error.response?.data.message ?? "Problem Getting Job Data");
      }
    };

    fetchJob();
  }, [id]);
}

export default useGetJobById;
