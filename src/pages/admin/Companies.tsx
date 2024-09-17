import CompaniesTable from "@/components/admin/CompaniesTable";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetUserComapanies from "@/hooks/useGetUserCompanies";
import { setSearchCompanyByText } from "@/redux/slices/companySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function () {
  useGetUserComapanies();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="flex flex-col flex-grow min-h-screen bg-slate-200">
      <Navbar />
      <div className="w-full mx-auto my-10 max-w-7xl">
        <div className="flex flex-col items-center my-5 sm:justify-between gap-y-6 sm:gap-y-0 sm:flex-row">
          <Input
            className="bg-white w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}
