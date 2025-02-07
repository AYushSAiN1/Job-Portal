import React from 'react';
import { Badge } from './ui/badge';

function LatestJobsCard({ job }) {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer flex flex-col gap-4 transition-colors">
            <div className="flex flex-col items-start gap-2">
                <h1 className="font-medium text-lg text-left text-gray-900 dark:text-gray-100">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-left">{job?.company?.location}</p>
            </div>
            <div className="flex flex-col items-start gap-2">
                <h1 className="font-bold text-lg text-left text-gray-900 dark:text-gray-100">{job?.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                    {job?.description}
                </p>
            </div>
            <div className="flex flex-wrap items-start gap-2 mt-4">
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">{job?.opening} Positions</Badge>
                <Badge className="text-red-500 font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobsCard;