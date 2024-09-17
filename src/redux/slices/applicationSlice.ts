import { createSlice } from "@reduxjs/toolkit";

type Applicants = {
  id: string;
  applicantId: string;
  status: "Accepted" | "Rejected" | "Pending";
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
  applicant: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      id: string;
      userId: string;
      bio: string;
      skills: string[];
      resume: string | null;
      resumeOriginalName: string;
      profilePhoto: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

type ApplicationInitialState = {
  applicants: Applicants[];
};

const initialState: ApplicationInitialState = {
  applicants: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});
export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
