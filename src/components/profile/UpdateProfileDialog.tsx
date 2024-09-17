import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import type { AxiosServerErrorResponse } from "@/pages/Login";
import { toast } from "sonner";
import { UPDATE_PROFILE } from "@/data/endPoints";
import { setUser } from "@/redux/slices/authSlice";

type UpdateProfileDialogType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

type InputType = {
  name: string;
  email: string;
  phoneNumber: string;
  bio: string;
  skills: string[] | undefined;
  resume: File | string | undefined;
  resumeOriginalName: string;
  profilePhoto: File | string | undefined;
};

export default function ({ open, setOpen }: UpdateProfileDialogType) {
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [input, setInput] = useState<InputType>({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills,
    resume: undefined,
    resumeOriginalName: user?.profile.resumeOriginalName || "",
    profilePhoto: undefined,
  });

  const dispatch = useDispatch<AppDispatch>();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (e.target.name === "resume") {
      setInput({ ...input, resume: file });
    } else if (e.target.name === "profilePhoto") {
      setInput({ ...input, profilePhoto: file });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const skills = input.skills
      ? input.skills
          .toString()
          .split(",")
          .map((skill) => skill.trim())
      : [];

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", JSON.stringify(skills));
    formData.append("resumeOriginalName", input.resumeOriginalName);

    if (typeof input.resume === "object") {
      formData.append("resume", input.resume);
    }

    if (typeof input.profilePhoto === "object") {
      formData.append("profilePicture", input.profilePhoto);
    }

    const loading = toast.loading("Updating Profile");

    try {
      setLoading(true);

      const response = await axios.put(UPDATE_PROFILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response && response.data.success) {
        setLoading(false);

        toast.dismiss(loading);

        dispatch(setUser(response.data.updatedUser));

        toast.success(response.data.message);
      }
    } catch (e) {
      const error = e as AxiosError<AxiosServerErrorResponse>;

      setLoading(false);

      toast.dismiss(loading);
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 mx-auto mb-8 bg-white sm:p-8 rounded-2xl">
      <Dialog open={open}>
        <DialogContent className="" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-hivebg-300">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col mx-auto">
              <div className="grid grid-cols-1 gap-8 p-2 my-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={input.email}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="number" className="font-medium">
                    Number
                  </Label>
                  <Input
                    id="number"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="bio" className="font-medium">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="skills" className="font-medium">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="separate skill by ' , '"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-hivebg-300">
                Upload a Resume to describe your skills{" "}
                <span className="text-red-400">
                  {"("} PDF<sup>*</sup> {")"}
                </span>
              </h3>

              <div className="grid grid-cols-1 gap-8 p-2 my-6 md:grid-cols-2">
                <div className="flex items-center gap-4">
                  <Label htmlFor="resume" className="font-medium">
                    Resume
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label htmlFor="resumeOriginalName" className="font-medium">
                    Resume Name
                  </Label>
                  <Input
                    id="resume"
                    name="resumeOriginalName"
                    placeholder="name of your resume"
                    type="text"
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-hivebg-300">
                Update your Profile Picture
              </h3>

              <div className="grid grid-cols-1 gap-8 p-2 my-6 md:grid-cols-2 ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="profilePicture" className="font-medium">
                    Profile Photo
                  </Label>
                  <Input
                    id="profilePicture"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="my-4 font-bold w-36 bg-hivebg-300"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
