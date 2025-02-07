import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';

function AppliedJobsTable() {
    const appliedJobs = [
        { id: 1, title: "Frontend Developer", company: "Tech Corp", status: "Pending", date: "2024-01-15" },
        { id: 2, title: "Backend Developer", company: "InnovateX", status: "Pending", date: "2024-01-20" },
        { id: 3, title: "Full Stack Developer", company: "Web Solutions", status: "Rejected", date: "2024-01-10" },
        { id: 4, title: "UI/UX Designer", company: "Creative Minds", status: "Accepted", date: "2024-01-18" },
    ];

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
                    {appliedJobs.map((job) => (
                        <TableRow key={job.id} className="border-b border-gray-200 dark:border-gray-700">
                            <TableCell className="py-4">{job.title}</TableCell>
                            <TableCell className="py-4">{job.company}</TableCell>
                            <TableCell className={`py-4 font-semibold ${job.status === "Accepted" ? "text-green-500" :
                                job.status === "Rejected" ? "text-red-500" :
                                    job.status === "Pending" ? "text-yellow-500" :
                                        "text-blue-500"}`}>
                                {job.status}
                            </TableCell>
                            <TableCell className="py-4">{job.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobsTable;
