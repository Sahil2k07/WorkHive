import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type JobProps = {
  job: {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    salary: number;
    experienceLevel: number;
    location: string;
    jobType: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    company: {
      id: string;
      name: string;
      description: string;
      website: string;
      location: string;
      logo: string;
    };
  };
};

export default function Job({ job }: JobProps) {
  const navigate = useNavigate();

  const daysAgoFunction = (dateTime: Date) => {
    const createdAt = new Date(dateTime);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - createdAt.getTime();

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-xl cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-gray-300"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-6 my-2 mb-4">
        <Button
          className="flex items-center justify-center rounded-md"
          variant="outline"
          size="icon"
        >
          <Avatar className="flex items-center justify-center object-contain object-center w-full h-full overflow-hidden bg-no-repeat rounded-md">
            <AvatarImage
              className="object-cover w-full h-full"
              src={job?.company?.logo}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg text-[#5072A7] font-bold">
            {job?.company?.name}
          </h1>
          <p className="text-sm font-semibold text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="my-2 text-lg font-bold">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <p className={"text-hiveblue-500 font-bold"}>
          {job?.position} Positions
        </p>
        <p className={"text-gray-700 font-bold"}>{job?.jobType}</p>
        <p className={"text-[#49796B] font-bold"}>{job?.salary} LPA</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?.id}`)}
          variant="outline"
          className="hover:bg-gray-300"
        >
          Details
        </Button>
        <Button className="font-semibold bg-hivebg-300">Save For Later</Button>
      </div>
    </div>
  );
}
