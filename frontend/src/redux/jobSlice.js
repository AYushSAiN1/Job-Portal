import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    appliedJobs: [],
    postedJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setPostedJobs: (state, action) => {
      state.postedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAppliedJobs, setPostedJobs } =
  jobSlice.actions;
export default jobSlice.reducer;
