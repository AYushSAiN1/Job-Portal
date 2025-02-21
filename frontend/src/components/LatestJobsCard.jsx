import React from 'react';
import { Badge } from './ui/badge';

function LatestJobsCard({ job }) {
    return (
        <div className="p-4 sm:p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-3 transition-all hover:shadow-xl">

            {/* Company Name & Location */}
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-md sm:text-lg font-medium text-gray-900 dark:text-gray-100">{job?.company?.name}</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{job?.company?.location}</p>
            </div>

            {/* Job Title & Description */}
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-md sm:text-lg font-bold text-gray-900 dark:text-gray-100">{job?.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {job?.description}
                </p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap items-start gap-2 mt-2">
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">{job?.opening} Positions</Badge>
                <Badge className="text-red-500 font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobsCard;
