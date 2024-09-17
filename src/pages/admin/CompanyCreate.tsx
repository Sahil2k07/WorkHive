import { Label } from "@radix-ui/react-label";
import Navbar from "../../components/common/Navbar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/slices/companySlice";
import axios, { AxiosError } from "axios";
import { REGISTER_COMPANY } from "@/data/endPoints";
import { AxiosServerErrorResponse } from "@/pages/Login";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");

  const { token } = useSelector((state: RootState) => state.auth);

  const registerNewCompany = async () => {
    try {
      const response = await axios.post(
        REGISTER_COMPANY,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        dispatch(setSingleCompany(response.data.company));

        toast.success(response.data.message);
        navigate(`/admin/companies`);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;
      console.log(error);
      toast.error(error.response?.data.message ?? "Unable to create Company");
    }
  };
  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />
      <div className="flex flex-col w-full max-w-lg gap-6 p-8 mx-auto mt-12 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-hivebg-300">
            Name Your Company
          </h1>
          <p className="mt-2 font-medium text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="mt-4">
          <Label className="block text-lg font-bold text-hivebg-300">
            Company Name
          </Label>
          <Input
            type="text"
            onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
            placeholder="e.g., JobHunt, WorkHive, Microsoft"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between gap-4 mt-6">
          <Button
            variant="outline"
            className="w-full py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="w-full py-2 font-semibold text-white rounded-lg bg-hiveblue-500 hover:bg-hiveblue-300"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
