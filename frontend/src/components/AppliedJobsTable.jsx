import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

function AppliedJobsTable() {
    const { appliedJobs } = useSelector(store => store.job);
    return (
        <div className="overflow-x-auto">
            <Table className="w-full text-sm text-gray-900 dark:text-white">
                <TableHeader>
                    <TableRow>
                        <TableCell className="font-semibold text-left">Job Title</TableCell>
                        <TableCell className="font-semibold text-left">Company</TableCell>
                        <TableCell className="font-semibold text-left">Status</TableCell>
                        <TableCell className="font-semibold text-left">Applied Date</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        appliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id} className="border-b border-gray-200 dark:border-gray-700">
                                <TableCell className="py-4">{appliedJob.job?.title}</TableCell>
                                <TableCell className="py-4">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className={`py-4 font-semibold ${appliedJob?.status === "Accepted" ? "text-green-500" :
                                    appliedJob?.status === "Rejected" ? "text-red-500" :
                                        appliedJob?.status === "Pending" ? "text-yellow-500" :
                                            "text-blue-500"}`}>
                                    {appliedJob?.status}
                                </TableCell>
                                <TableCell className="py-4">{appliedJob?.createdAt ? formatDistanceToNow(new Date(appliedJob?.createdAt), { addSuffix: true }) : ''}</TableCell>
                            </TableRow>
                        ))}


                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobsTable;
