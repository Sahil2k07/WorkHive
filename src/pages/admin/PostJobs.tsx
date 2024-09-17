import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { Label } from "@radix-ui/react-label";
import axios, { type AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosServerErrorResponse } from "../Login";
import { POST_JOB } from "@/data/endPoints";

type PostJobType = {
  title: string;
  description: string;
  requirements: string[];
  salary: number | undefined;
  location: string;
  jobType: string;
  experience: number | undefined;
  position: number;
  companyId: string;
};

export default function PostJob() {
  const [input, setInput] = useState<PostJobType>({
    title: "",
    description: "",
    requirements: [],
    salary: undefined,
    location: "",
    jobType: "",
    experience: undefined,
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { userCompanies } = useSelector((state: RootState) => state.company);
  const { token } = useSelector((state: RootState) => state.auth);

  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "requirements") {
      setInput({
        ...input,
        requirements: value.split(",").map((requirement) => requirement.trim()),
      });
    } else if (
      name === "salary" ||
      name === "experience" ||
      name === "position"
    ) {
      setInput({ ...input, [name]: Number(value) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(POST_JOB, input, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/admin/jobs");
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center flex-grow bg-gradient-to-r from-blue-100 to-indigo-200">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl p-8 space-y-6 bg-white border border-gray-300 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-extrabold text-center text-hivebg-300">
            Create a New Job Listing
          </h2>
          <p className="text-center text-gray-600">
            Fill out the form below to post a job.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Job Title
              </Label>
              <Input
                type="text"
                required
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter job title"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Description
              </Label>
              <Input
                type="text"
                required
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter job description"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Requirements
              </Label>
              <Input
                type="text"
                name="requirements"
                required
                value={input.requirements.join(", ")}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter job requirements (comma ',' separated)"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Salary
              </Label>
              <Input
                type="number"
                name="salary"
                required
                value={input.salary || ""}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Salary in LPA"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                required
                value={input.location}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter job location"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Job Type
              </Label>
              <Input
                type="text"
                name="jobType"
                required
                value={input.jobType}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter job type"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Experience Level
              </Label>
              <Input
                type="number"
                name="experience"
                required
                value={input.experience}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Experience in Years"
              />
            </div>

            <div className="col-span-1">
              <Label className="block mb-2 text-sm font-bold text-gray-700">
                Number of Positions
              </Label>
              <Input
                type="number"
                required
                name="position"
                value={input.position || ""}
                onChange={changeEventHandler}
                className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter number of positions"
              />
            </div>

            {userCompanies.length > 0 && (
              <div className="col-span-1">
                <Label className="block mb-2 text-sm font-semibold text-gray-700">
                  Select Company
                </Label>
                <select
                  name="companyId"
                  required
                  value={input.companyId}
                  onChange={(e) =>
                    setInput({ ...input, companyId: e.target.value })
                  }
                  className="w-full p-3 text-sm border-2 rounded-md shadow-sm focus:outline-none"
                >
                  <option value={""} disabled>
                    Select company
                  </option>
                  {userCompanies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
