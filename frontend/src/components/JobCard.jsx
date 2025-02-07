import React from 'react';
import { Bookmark } from 'react-feather';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function JobCard({ job }) {
    const navigate = useNavigate();

    // Format posted date as 'X days ago'
    const postedDate = job?.createdAt ? formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true }) : '';

    return (
        <div className="p-4 rounded-lg shadow-md bg-white  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-3 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">{postedDate}</p>
                <Button size="icon" variant="outline" className="h-7 w-7 flex items-center justify-center rounded-full">
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3">
                <Button size="icon" variant="ghost">
                    <Avatar>
                        <AvatarImage
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVBFVCXaKHPtsRwj9tMxipgpEEMRUHa8Qaw&s"
                            alt="Company Logo"
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{job?.company?.name}</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{job?.company?.location}</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{job?.title}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">
                    {job?.opening} Positions
                </Badge>
                <Badge className="text-red-500 font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-blue-700 dark:text-blue-400 font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-2">
                <Button onClick={() => navigate(`/description/${job?._id}`)} className="bg-pink-600 text-white hover:bg-pink-700 transition h-8 text-sm">
                    Apply Now
                </Button>
                <Button variant="outline" className="h-8 text-sm">
                    Save
                </Button>
            </div>
        </div>
    );
}

export default JobCard;
