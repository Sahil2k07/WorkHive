import { GET_COMPANY } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setSingleCompany } from "@/redux/slices/companySlice";
import type { AppDispatch } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function useGetCompanyById(id: string) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios.get(`${GET_COMPANY}/${id}`);

        if (response.data.success) {
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(error.response?.data.message ?? "Problem fetching Details");
      }
    };

    getCompany();
  }, [id]);
}

export default useGetCompanyById;
