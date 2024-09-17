import useGetCompanyById from "@/hooks/useGetCompanyById";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import type { RootState } from "@/redux/store";
import axios, { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../components/common/Navbar";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { DELETE_COMPANY, UPDATE_COMPANY } from "@/data/endPoints";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

type InputType = {
  name: string;
  description: string;
  website: string;
  location: string;
  logo: File | string | undefined;
};

export default function () {
  const { id = "" } = useParams();

  useGetCompanyById(id);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<InputType>({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: undefined,
  });

  const { singleCompany } = useSelector((state: RootState) => state.company);
  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const logo = e.target.files?.[0];
    setInput({ ...input, logo });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.logo && typeof input.logo === "object") {
      formData.append("logo", input.logo);
    }

    try {
      setLoading(true);

      const res = await axios.put(`${UPDATE_COMPANY}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.error(error.response?.data.message ?? "Problems updating");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      logo: singleCompany?.logo || undefined,
    });
  }, [singleCompany]);

  const deleteCompanyHandler = async () => {
    try {
      const response = await axios.delete(DELETE_COMPANY, {
        data: { id },
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        navigate("/admin/companies");

        toast.success(response.data.message);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.error(
        error.response?.data.message ?? "Error while Deleting Company"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />
      <div className="max-w-4xl p-6 mx-auto my-16 bg-white rounded-lg shadow-lg sm:p-8">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-start justify-between gap-5 mb-8 sm:items-center sm:flex-row">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 font-semibold text-white bg-hivebg-300 hover:bg-hivebg-200 hover:text-white"
            >
              <ArrowLeft />
              {/* <span>Back</span> */}
            </Button>
            <h1 className="text-2xl font-extrabold text-hivebg-300">
              Update Company Details
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label
                htmlFor="name"
                className="block font-bold text-md text-hivebg-300"
              >
                Company Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="block font-bold text-md text-hivebg-300"
              >
                Description
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="website"
                className="block font-bold text-md text-hivebg-300"
              >
                Website
              </Label>
              <Input
                id="website"
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="location"
                className="block font-bold text-md text-hivebg-300"
              >
                Location
              </Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
              />
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="logo"
                className="block font-bold text-md text-hivebg-300"
              >
                Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-between mx-auto sm:mx-0 sm:flex-row sm:items-center">
            {loading ? (
              <Button
                className="flex items-center justify-center w-full py-2 mt-6 font-semibold text-white rounded-md shadow-sm bg-hiveblue-500"
                disabled
              >
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-6 font-bold text-white bg-hiveblue-500"
              >
                Update Company
              </Button>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button className="mt-6 font-bold text-white bg-red-500 hover:bg-red-400">
                  Delete Company
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white border rounded-lg shadow-lg">
                <p className="mb-4 text-lg font-semibold text-gray-700">
                  Are you sure you want to delete this company?
                </p>
                <div className="flex items-center justify-end gap-4">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={deleteCompanyHandler}
                    className="text-white bg-red-500 hover:bg-red-400"
                  >
                    Confirm Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </div>
    </div>
  );
}
