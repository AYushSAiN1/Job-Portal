import React from 'react';
import LatestJobsCard from './LatestJobsCard';
import { useSelector } from 'react-redux';


const LatestJobs = () => {
    const { allJobs } = useSelector(state => state.job);
    return (
        <div className="relative bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 min-h-[45vh] flex items-center flex-col text-center px-4 sm:px-6 lg:px-8 mx-8 mt-20 mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                Latest Job Openings
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full mx-4 mt-2">
                {allJobs.length <= 0 ? <span> No Jobs available </span> : allJobs?.slice(0, 8).map((job, index) => (
                    <LatestJobsCard key={job?._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default LatestJobs;
