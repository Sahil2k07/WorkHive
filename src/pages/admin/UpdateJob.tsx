import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetJobById from "@/hooks/useGetJobById";
import { RootState } from "@/redux/store";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios, { AxiosError } from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AxiosServerErrorResponse } from "../Login";
import { DELETE_JOB, UPDATE_JOB } from "@/data/endPoints";

type UpdateJobType = {
  title: string;
  description: string;
  requirements: string[];
  salary: number | undefined;
  location: string;
  jobType: string;
  experienceLevel: number | undefined;
  position: number;
};

export default function () {
  const { id = "" } = useParams();

  useGetJobById(id);

  const { singleJob } = useSelector((state: RootState) => state.job);
  const { token } = useSelector((state: RootState) => state.auth);

  const [input, setInput] = useState<UpdateJobType>({
    title: "",
    description: "",
    requirements: [],
    salary: undefined,
    location: "",
    jobType: "",
    experienceLevel: undefined,
    position: 0,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "requirements") {
      setInput({
        ...input,
        requirements: value.split(",").map((requirement) => requirement.trim()),
      });
    } else if (
      name === "salary" ||
      name === "position" ||
      name === "position"
    ) {
      setInput({ ...input, [name]: Number(value) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const loading = toast.loading("Updating Job Post...");

    try {
      const response = await axios.put(`${UPDATE_JOB}/${id}`, input, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        toast.dismiss(loading);

        navigate("/admin/jobs");

        toast.success(response.data.message);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.dismiss(loading);

      toast.error(
        error.response?.data.message ?? "Error while Updating Job Post"
      );
    }
  };

  const deleteJobHandler = async () => {
    const loading = toast.loading("Deleting Job Post...");

    try {
      const response = await axios.delete(`${DELETE_JOB}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        toast.dismiss(loading);

        navigate("/admin/jobs");

        toast.success(response.data.message);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.dismiss(loading);

      toast.error(
        error.response?.data.message ?? "Error while Deleting Job Post"
      );
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title,
        description: singleJob.description,
        requirements: singleJob.requirements,
        salary: singleJob.salary,
        location: singleJob.location,
        jobType: singleJob.jobType,
        experienceLevel: singleJob.experienceLevel,
        position: singleJob.position,
      });
      setLoading(false);
    }
  }, [singleJob]);

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />
      <div className="max-w-4xl p-6 mx-auto my-16 bg-white rounded-lg shadow-lg sm:p-8">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-start justify-between gap-5 mb-8 sm:items-center sm:flex-row">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 font-semibold text-white bg-hivebg-300 hover:bg-hivebg-200 hover:text-white"
            >
              <ArrowLeft />
              {/* <span>Back</span> */}
            </Button>
            <h1 className="text-2xl font-extrabold text-hivebg-300">
              Update Job Details
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label
                htmlFor="title"
                className="block font-bold text-md text-hivebg-300"
              >
                Job Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Enter job title"
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
                placeholder="Enter job description"
              />
            </div>

            <div>
              <Label
                htmlFor="requirements"
                className="block font-bold text-md text-hivebg-300"
              >
                Requirements
              </Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                value={input.requirements.join(", ")}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Enter job requirements (comma ',' separated)"
              />
            </div>

            <div>
              <Label
                htmlFor="salary"
                className="block font-bold text-md text-hivebg-300"
              >
                Salary
              </Label>
              <Input
                id="salary"
                type="number"
                name="salary"
                value={input.salary || ""}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Salary in LPA"
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
                placeholder="Enter job location"
              />
            </div>

            <div>
              <Label
                htmlFor="jobType"
                className="block font-bold text-md text-hivebg-300"
              >
                Job Type
              </Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Enter job type"
              />
            </div>

            <div>
              <Label
                htmlFor="experience"
                className="block font-bold text-md text-hivebg-300"
              >
                Experience Level
              </Label>
              <Input
                id="experienceLevel"
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Experience in Years"
              />
            </div>

            <div>
              <Label
                htmlFor="position"
                className="block font-bold text-md text-hivebg-300"
              >
                Number of Positions
              </Label>
              <Input
                id="position"
                type="number"
                name="position"
                value={input.position || ""}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-hiveblue-500 focus:border-hiveblue-500"
                placeholder="Enter number of positions"
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
                Update Job
              </Button>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button className="mt-6 font-bold text-white bg-red-500 hover:bg-red-400">
                  Delete Job
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white border rounded-lg shadow-lg">
                <p className="mb-4 text-lg font-semibold text-gray-700">
                  Are you sure you want to delete this Job Post?
                </p>
                <div className="flex items-center justify-end gap-4">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={deleteJobHandler}
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
