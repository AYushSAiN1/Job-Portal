import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Phone, Edit } from 'react-feather';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobsTable from './AppliedJobsTable';
import EditProfileDialog from './EditProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import PostedJobsTable from './recruiter/PostedJobsTable';
import useGetAllPostedJobs from '@/hooks/useGetAllPostedJobs';

function Profile() {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    user && user?.role === "recruiter" && useGetAllPostedJobs();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-6 p-6 sm:p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">

                    {/* Profile Info */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-indigo-500">
                            <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100">{user?.fullname}</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{user?.profile.bio}</p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <Button
                        onClick={() => setOpen(true)}
                        className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md flex items-center gap-1"
                    >
                        <Edit size={16} />
                        <span className="hidden sm:inline">Edit</span>
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-4 sm:mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-400 text-sm sm:text-base">
                        <Mail size={18} />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-400 text-sm sm:text-base">
                        <Phone size={18} />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills & Resume (Only for Candidates) */}
                {user?.role !== "recruiter" && (
                    <>
                        <div className="mt-6">
                            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">Skills</h1>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile.skills.length !== 0 ? (
                                    user.profile.skills.map((item, index) => (
                                        <Badge key={index} className="bg-indigo-500 text-white px-3 py-1 rounded-md">
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-500">NA</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <Label className="text-md font-bold text-gray-900 dark:text-gray-100">
                                {user?.profile.resumeOriginalName}
                            </Label>
                            <a
                                target="blank"
                                href={user.profile.resume}
                                className="text-indigo-600 hover:underline cursor-pointer block mt-2 text-sm"
                            >
                                View Resume
                            </a>
                        </div>
                    </>
                )}
            </div>

            {/* Job Tables */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 sm:p-8 my-6">
                <h1 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-5">
                    {user?.role === "recruiter" ? "Posted Jobs" : "Applied Jobs"}
                </h1>
                {user?.role === "recruiter" ? <PostedJobsTable /> : <AppliedJobsTable />}
            </div>

            {/* Edit Profile Dialog */}
            <EditProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
