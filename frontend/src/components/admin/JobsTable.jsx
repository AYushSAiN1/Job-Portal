import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useSelector } from "react-redux";

function JobsTable() {
    const { singleCompany } = useSelector((state) => state.company);
    const { allJobs } = useSelector((state) => state.job);

    const jobs = allJobs?.filter((job) => job?.company?._id === singleCompany?._id) || [];

    const handleEdit = (job) => {
        console.log("Edit Job:", job);
        // Add your edit logic here
    };

    const handleDelete = (jobId) => {
        console.log("Delete Job ID:", jobId);
        // Add delete API call logic here
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
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)}>
                                            <Trash className="h-4 w-4 mr-1" /> Delete
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
