import Navbar from "@/components/common/Navbar";
import AppliedJobTable from "@/components/profile/AppliedJobTable";
import UpdateProfileDialog from "@/components/profile/UpdateProfileDialog";
import { Button } from "@/components/ui/button";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function () {
  useGetAppliedJobs();

  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col flex-grow min-h-screen h-max bg-image`}>
      <Navbar />
      <div className="w-full max-w-4xl p-6 mx-auto my-5 bg-white border border-gray-200 sm:p-8 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Avatar className="w-24 h-24 mb-6">
              <AvatarImage
                src={user?.profile.profilePhoto}
                className="rounded-md"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-hivebg-300">
                {user?.name}
              </h1>
              <p className="text-sm text-hivebg-100">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-sm text-white bg-hivebg-300"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 font-medium">
            <Mail className="text-hiveblue-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 font-medium">
            <Contact className="text-hiveblue-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-md">Skills</h1>
          <div className="flex flex-wrap gap-6">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <p key={index} className="font-semibold text-hiveblue-600">
                  {item}
                </p>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-md">Resume</Label>
          {user?.profile.resume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="w-auto cursor-pointer text-hiveblue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-red-400">NA</span>
          )}
        </div>
      </div>
      <div
        className={`${
          user?.role === "Recruiter" ? "hidden" : ""
        } w-full max-w-4xl p-6 mx-auto mb-8 bg-white sm:p-8 rounded-2xl`}
      >
        <h1 className="my-5 text-2xl font-bold text-hivebg-300">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      <div className={`${open ? "" : "hidden"}`}>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
