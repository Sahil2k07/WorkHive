import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

type JobProps = {
  job: {
    id: string;
    company: {
      name: string;
    };
    title: string;
    description: string;
    position: number;
    jobType: string;
    salary: number;
  };
};

export default function ({ job }: JobProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job.id}`)}
      className="flex flex-col gap-4 p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer"
    >
      <div>
        <h1 className="text-lg text-[#5072A7] font-extrabold">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">{job?.title}</h1>
        <p className="text-sm text-gray-600 text-wrap">{job?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Badge
          className={"bg-hiveblue-300 text-white p-1 font-bold"}
          variant="outline"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className={"bg-gray-700 text-white p-1 font-bold"}
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className={"bg-[#49796B] text-white p-1 font-bold"}
          variant="outline"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}
