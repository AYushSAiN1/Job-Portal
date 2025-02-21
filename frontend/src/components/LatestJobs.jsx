import React from 'react';
import LatestJobsCard from './LatestJobsCard';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(state => state.job);

    return (
        <div className="relative bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 min-h-[45vh] flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 mx-auto mt-2 mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-5">
                Latest Job Openings
            </h2>

            {/* Grid Layout - Responsive */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto mt-2">
                {allJobs.length <= 0 ? (
                    <span className="text-gray-500 dark:text-gray-400 text-lg">No Jobs Available</span>
                ) : (
                    allJobs.slice(0, 8).map((job) => (
                        <LatestJobsCard key={job?._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
