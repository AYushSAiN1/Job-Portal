import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetCompany from '@/hooks/useGetCompany';
import { useSelector } from 'react-redux';
import { Briefcase, MapPin, Globe, Users, Edit } from 'react-feather';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import JobsTable from './JobsTable';
import EditCompanyDialog from './EditCompanyDialog';
import { Avatar, AvatarImage } from '../ui/avatar';
import useGetAllJobs from '@/hooks/useGetAllJobs';

function CompanyDetails() {
    const params = useParams();
    useGetCompany(params.id);
    useGetAllJobs();

    const { singleCompany } = useSelector((state) => state.company);
    const [open, setOpen] = useState(false);

    if (!singleCompany) {
        return <div className="text-center mt-10 text-gray-500">Loading company details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-10 p-8 shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-6' >
                        <Avatar className="h-24 w-24 ">
                            <AvatarImage src={singleCompany?.logo} alt="LOGO" />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">{singleCompany?.name}</h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                        <Edit size={16} />
                    </Button>
                </div>
                {/* Company Details */}
                <div className="my-6">
                    {singleCompany?.location && (
                        <div className="flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400">
                            <MapPin size={18} />
                            <span>{singleCompany.location}</span>
                        </div>
                    )}
                    {singleCompany?.website && (
                        <div className="flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400">
                            <Globe size={18} />
                            <a href={singleCompany.website} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                                {singleCompany.website}
                            </a>
                        </div>
                    )}
                    {singleCompany?.industry && (
                        <div className="flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400">
                            <Briefcase size={18} />
                            <span>{singleCompany.industry}</span>
                        </div>
                    )}
                    {singleCompany?.companySize && (
                        <div className="flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400">
                            <Users size={18} />
                            <span>{singleCompany.companySize} employees</span>
                        </div>
                    )}
                </div>

                {/* Company Description */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">About {singleCompany?.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {singleCompany?.description || "No description available."}
                    </p>
                </div>


                {/* Jobs Table */}
                <div className="mt-6">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Openings</h1>
                    <JobsTable />
                </div>
            </div>

            {/* Edit Company Dialog */}
            <EditCompanyDialog open={open} setOpen={setOpen} company={singleCompany} />
        </div>


    );
}

export default CompanyDetails;