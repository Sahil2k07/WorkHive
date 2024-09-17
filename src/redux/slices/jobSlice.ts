import { createSlice } from "@reduxjs/toolkit";

type AllJobs = {
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
}[];

type AllAdminJobs = AllJobs;

type SingleJob = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  applications: {
    id: string;
    applicantId: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
} | null;

type AllAppliedJobs = {
  id: string;
  applicantId: string;
  status: "Pending" | "Accepted" | "Rejected";
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
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
      userId: string;
      name: string;
      description: string;
      website: string;
      loation: string;
      logo: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}[];

type JobInitialState = {
  allJobs: AllJobs;
  searchQuery: string;
  singleJob: SingleJob;
  allAppliedJobs: AllAppliedJobs;
  allAdminJobs: AllAdminJobs;
  searchJobByText: string;
};

const initialState: JobInitialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchQuery: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchQuery,
} = jobSlice.actions;

export default jobSlice.reducer;
