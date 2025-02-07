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

function Profile() {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-10 p-8 shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-24 w-24 border-4 border-indigo-500">
                            <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-900 dark:text-gray-100'>{user?.fullname}</h1>
                            <p className='text-gray-600 dark:text-gray-400'>{user?.profile.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                        <Edit size={16} />
                    </Button>
                </div>
                <div className='my-6'>
                    <div className='flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400'>
                        <Mail size={18} />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-4 my-3 text-gray-700 dark:text-gray-400'>
                        <Phone size={18} />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {
                    user && user?.role == "recruiter" ? <> </> :
                        <>
                            <div className='my-6'>
                                <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2'>Skills</h1>
                                <div className='flex flex-wrap gap-2'>
                                    {user?.profile.skills.length !== 0 ? user.profile.skills.map((item, index) => (
                                        <Badge key={index} className='bg-indigo-500 text-white px-3 py-1 rounded-md'>{item}</Badge>
                                    )) : <span className='text-gray-500'>NA</span>}
                                </div>
                            </div>
                            <div className='mt-6'>
                                <Label className="text-md font-bold text-gray-900 dark:text-gray-100">{user?.profile.resumeOriginalName}</Label>
                                <a target='blank' href={user.profile.resume} className='text-indigo-600 hover:underline cursor-pointer block mt-2'>View Resume</a>
                            </div>
                        </>
                }

            </div>

            {
                user && user?.role == "recruiter" ? <> </> : <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 my-10'>
                    <h1 className='font-bold text-xl text-gray-900 dark:text-gray-100 mb-5'>Applied Jobs</h1>
                    <AppliedJobsTable />
                </div>
            }

            {/* Edit Profile Dialog */}
            <EditProfileDialog
                open={open} setOpen={setOpen}
            />

        </div >
    );
}

export default Profile;