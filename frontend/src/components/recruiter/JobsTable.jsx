import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAllJobs } from "@/redux/jobSlice";

function JobsTable() {
    const { singleCompany } = useSelector((state) => state.company);
    const { allJobs } = useSelector((state) => state.job);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const jobs = allJobs?.filter((job) => job?.company?._id === singleCompany?._id) || [];

    const handleDelete = async (id) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                toast.success("Job deleted successfully!");
                dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };


    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Job Listings</h2>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Openings</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <TableRow key={job._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.opening || "N/A"}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.jobType}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="destructive" onClick={() => handleDelete(job._id)}>
                                            {loading ? "Deleting..." : <><Trash className="h-4 w-4 mr-1" /> Delete</>}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center py-4">
                                    No jobs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default JobsTable;
