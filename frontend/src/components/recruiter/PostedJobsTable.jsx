import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostedJobsTable() {
    const navigate = useNavigate();
    const { postedJobs } = useSelector(store => store.job);

    const handleViewApplicants = (jobId) => {
        navigate(`/jobs/${jobId}/applicants`);
    };

    return (
        <div className="overflow-x-auto">
            <Table className="w-full text-sm text-gray-900 dark:text-white">
                <TableHeader>
                    <TableRow>
                        <TableCell className="font-semibold text-left">Job Title</TableCell>
                        <TableCell className="font-semibold text-left">Company</TableCell>
                        <TableCell className="font-semibold text-left">Applicants</TableCell>
                        <TableCell className="font-semibold text-left">Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {postedJobs.map((job) => (
                        <TableRow key={job._id} className="border-b border-gray-200 dark:border-gray-700">
                            <TableCell className="py-4">{job.title}</TableCell>
                            <TableCell className="py-4">{job.company?.name}</TableCell>
                            <TableCell className="py-4">{job.applications?.length || 0}</TableCell>
                            <TableCell className="py-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleViewApplicants(job._id)}
                                >
                                    View Applicants
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default PostedJobsTable;