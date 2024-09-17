import AdminJobsTable from "@/components/admin/AdminJobsTable";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/slices/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function () {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="flex flex-col flex-grow min-h-screen bg-slate-200">
      <Navbar />
      <div className="w-full max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="bg-white w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-hivebg-300 hover:bg-hivebg-200"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}
