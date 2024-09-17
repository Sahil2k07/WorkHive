import { createSlice } from "@reduxjs/toolkit";

type AuthInitialState = {
  loading: boolean;
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "Student" | "Recruiter";
    profile: {
      id: string;
      userId: string;
      bio: string;
      skills: string[];
      resume: string;
      resumeOriginalName: string;
      profilePhoto: string;
    };
  } | null;
};

const initialState: AuthInitialState = {
  loading: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setLoading, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
