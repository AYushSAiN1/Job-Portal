import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "react-feather";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
    const navigate = useNavigate();
    const { allCompanies, searchedCompany } = useSelector((state) => state.company);
    const { user } = useSelector((state) => state.auth);
    const { allJobs } = useSelector((state) => state.job); // Assuming jobs are stored in Redux

    // Function to get job count for a company
    const getJobCount = (companyId) => {
        return allJobs?.filter((job) => job?.company?._id === companyId).length || 0;
    };

    // Filter companies based on search input
    const filteredCompanies = allCompanies?.filter((company) =>
        company?.name?.toLowerCase().includes(searchedCompany.toLowerCase())
    );

    return (
        <div className="overflow-x-auto max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">All Registered Companies</h2>
            <Table className="w-full text-sm text-gray-900 dark:text-white">
                <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                        <TableCell className="font-semibold text-left py-3 px-4">Logo</TableCell>
                        <TableCell className="font-semibold text-left py-3 px-4">Company Name</TableCell>
                        <TableCell className="font-semibold text-left py-3 px-4">Location</TableCell>
                        <TableCell className="font-semibold text-left py-3 px-4">Jobs Available</TableCell>
                        <TableCell className="font-semibold text-left py-3 px-4">Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies?.map((company, index) => (
                        <TableRow
                            key={company._id}
                            className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""}`}
                        >
                            <TableCell className="py-4 px-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={company?.logo || 'default-logo.png'} alt={company?.name} />
                                    <AvatarFallback>{company?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="py-4 px-4">{company?.name}</TableCell>
                            <TableCell className="py-4 px-4">{company?.location}</TableCell>
                            <TableCell className="text-center py-4 px-4 font-semibold">
                                {getJobCount(company._id)}
                            </TableCell>
                            <TableCell className="text-center py-4 px-4">
                                {
                                    user && user?._id == company.userId ?
                                        <Popover>
                                            <PopoverTrigger aria-label="More options">
                                                <MoreHorizontal className="mx-auto" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div
                                                    onClick={() => navigate(`/companies/${company._id}`)}
                                                    className="flex items-center gap-2 w-fit cursor-pointer"
                                                >

                                                    <span>Details</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover> : <p >N/A</p>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <p className="mt-2 font-light text-gray-300">*Recruiter can modify his own registered companies*</p>
        </div>
    );
}

export default CompaniesTable;
