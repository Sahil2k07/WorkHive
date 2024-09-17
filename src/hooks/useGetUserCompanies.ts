import { USER_COMPANIES } from "@/data/endPoints";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { setUserCompanies } from "@/redux/slices/companySlice";
import type { AppDispatch, RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function useGetUserComapanies() {
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserCompanies = async () => {
      try {
        const response = await axios.get(USER_COMPANIES, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          dispatch(setUserCompanies(response.data.company));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(
          error.response?.data.message ?? "Error while loading Companies"
        );
      }
    };

    fetchUserCompanies();
  }, []);
}

export default useGetUserComapanies;
