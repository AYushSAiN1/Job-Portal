import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Edit } from 'react-feather';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
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

    if (user?.role === "recruiter") {
        useGetAllPostedJobs();
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl my-8 p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full">

                    {/* Profile Image & Info Container */}
                    <div className="flex items-center gap-6 w-full">
                        {/* Profile Avatar */}
                        <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-indigo-500 shadow-lg transform hover:scale-105 transition-all duration-300">
                            <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                            <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                        </Avatar>

                        {/* Profile Name & Bio */}
                        <div className="flex-1">
                            <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-gray-100">
                                {user?.fullname}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg mt-1 italic">
                                {user?.profile.bio || "No bio available"}
                            </p>
                        </div>

                        {/* Edit Button - Now Looks Natural */}
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                            aria-label="Edit Profile"
                        >
                            <Edit size={18} />
                            <span className="hidden sm:inline font-semibold">Edit</span>
                        </Button>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 space-y-4 text-base sm:text-lg">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Mail size={20} className="text-indigo-500" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Phone size={20} className="text-indigo-500" />
                        <span>{user?.phoneNumber || "Not provided"}</span>
                    </div>
                </div>

                {/* Skills & Resume (Only for Candidates) */}
                {user?.role !== "recruiter" && (
                    <>
                        <div className="mt-6">
                            <h1 className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3">
                                Skills
                            </h1>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {user?.profile.skills?.length > 0 ? (
                                    user.profile.skills.map((item, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300"
                                        >
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-500">No skills added</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <Label className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                Resume
                            </Label>
                            {user?.profile.resume ? (
                                <a
                                    target="_blank"
                                    href={user.profile.resume}
                                    className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer block mt-2 text-lg transition-all duration-300"
                                >
                                    {user?.profile.resumeOriginalName || "View Resume"}
                                </a>
                            ) : (
                                <span className="text-gray-500">No resume uploaded</span>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Job Tables */}
            <div className="max-w-4xl mx-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-6 sm:p-10 my-8 hover:shadow-2xl transition-all duration-300">
                <h1 className="font-bold text-lg sm:text-2xl text-gray-900 dark:text-gray-100 mb-6">
                    {user?.role === "recruiter" ? "Posted Jobs" : "Applied Jobs"}
                </h1>
                <div className="overflow-x-auto">
                    {user?.role === "recruiter" ? <PostedJobsTable /> : <AppliedJobsTable />}
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <EditProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
