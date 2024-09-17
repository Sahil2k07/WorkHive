import { createSlice } from "@reduxjs/toolkit";

type UserCompany = {
  id: string;
  userId: string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
};

type CompanyInitialState = {
  singleCompany: UserCompany | null;
  userCompanies: UserCompany[];
  searchCompanyByText: string;
};

const initialState: CompanyInitialState = {
  singleCompany: null,
  userCompanies: [],
  searchCompanyByText: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setUserCompanies: (state, action) => {
      state.userCompanies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});
export const { setSingleCompany, setUserCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
