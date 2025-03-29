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

    // Fallback values for profile data
    const profileData = user?.profile || {};
    const fullName = user?.fullname || 'No Name Provided';
    const email = user?.email || 'No Email Provided';
    const phoneNumber = user?.phoneNumber || 'Not provided';
    const bio = profileData.bio || 'No bio available';
    const skills = profileData.skills || [];
    const resume = profileData.resume;
    const resumeName = profileData.resumeOriginalName || 'View Resume';
    const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <Avatar className="h-28 w-28 border-4 border-indigo-500 shadow-lg">
                                <AvatarImage src={profileData.profilePhoto} alt={`${fullName}'s profile`} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all"
                                aria-label="Edit Profile"
                            >
                                <Edit size={18} />
                                <span className="font-semibold">Edit</span>
                            </Button>
                        </div>

                        {/* Profile Info Section */}
                        <div className="flex-1 w-full">
                            <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-gray-100 mb-2">
                                {fullName}
                            </h1>

                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 italic">
                                {bio}
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Mail size={20} className="text-indigo-500 flex-shrink-0" />
                                    <span className="break-all">{email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Phone size={20} className="text-indigo-500 flex-shrink-0" />
                                    <span>{phoneNumber}</span>
                                </div>
                            </div>

                            {/* Skills & Resume (Only for Candidates) */}
                            {user?.role !== "recruiter" && (
                                <>
                                    <div className="mb-6">
                                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3">
                                            Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.length > 0 ? (
                                                skills.map((skill, index) => (
                                                    <Badge
                                                        key={index}
                                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400">No skills added</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            Resume
                                        </Label>
                                        {resume ? (
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={resume}
                                                className="text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer block mt-2"
                                            >
                                                {resumeName}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400">No resume uploaded</span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Tables */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all">
                    <h2 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100 mb-6">
                        {user?.role === "recruiter" ? "Posted Jobs" : "Applied Jobs"}
                    </h2>
                    <div className="overflow-x-auto">
                        {user?.role === "recruiter" ? <PostedJobsTable /> : <AppliedJobsTable />}
                    </div>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <EditProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;