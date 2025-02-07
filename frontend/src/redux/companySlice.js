import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "comapny",
  initialState: {
    allCompanies: [],
    singleCompany: null,
    searchedCompany: null,
  },
  reducers: {
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setSearchedCompany: (state, action) => {
      state.searchedCompany = action.payload;
    },
  },
});

export const { setAllCompanies, setSingleCompany, setSearchedCompany } =
  companySlice.actions;
export default companySlice.reducer;
