import { Button } from "../ui/button";
import Navbar from "../common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { APPLY_JOB, GET_JOB_ID } from "@/data/endPoints";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/slices/jobSlice";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { formatDate } from "@/data/dateFormatter";

export default function () {
  const { singleJob } = useSelector((state: RootState) => state.job);
  const { user, token } = useSelector((state: RootState) => state.auth);

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const naviagte = useNavigate();

  const isApplied = singleJob?.applications.some((application) => {
    return application.applicantId === user?.id;
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${GET_JOB_ID}/${id}`);

        if (response.data.success) {
          dispatch(setSingleJob(response?.data?.job));
        }
      } catch (e) {
        const error = e as AxiosError<AxiosServerErrorResponse>;

        toast.error(error.message);
      }
    };

    fetchJob();
  }, []);

  const applyJobHandler = async () => {
    if (isApplied) return;

    if (!user) {
      toast.error("Login First");
      return;
    }

    if (user.role === "Recruiter") {
      toast.error("Only Students can Apply. Sorry!");
      return;
    }

    const loading = toast.loading("Applying...");

    try {
      const response = await axios.post(
        `${APPLY_JOB}/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response && response?.data?.success) {
        toast.dismiss(loading);

        toast.success(response?.data?.message);

        naviagte(0);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      console.log(error);

      toast.dismiss(loading);
      toast.error(error?.response?.data.message ?? "Error while Applying");
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-screen bg-slate-200">
      <Navbar />
      <div className="w-full h-auto p-8 mx-6 my-10 bg-white rounded-lg xl:mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-4 sm:items-center sm:justify-between sm:flex-row ">
          <div>
            <h1 className="text-4xl font-extrabold text-[#5072A7]">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <p className={"text-hiveblue-500 text-lg font-bold"}>
                {singleJob?.position} Positions
              </p>
              <p className={"text-gray-600 text-lg font-bold"}>
                {singleJob?.jobType}
              </p>
              <p className={"text-[#49796B] text-lg font-bold"}>
                {singleJob?.salary}LPA
              </p>
            </div>
          </div>
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg z-0 ${
              isApplied
                ? "bg-red-500 cursor-not-allowed"
                : "bg-hivebg-300 text-white hover:bg-hivebg-200"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="py-4 font-medium border-b-2 border-b-gray-300">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="my-1 font-bold">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="my-1 font-bold">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt
                ? formatDate(singleJob.createdAt.toString())
                : ""}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
