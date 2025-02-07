import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Briefcase, MapPin, Calendar } from 'react-feather';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import { ReceiptIndianRupee } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

function JobDescription() {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {}, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);


    // // Format posted date as 'X days ago'
    const postedDate = singleJob?.createdAt ? formatDistanceToNow(new Date(singleJob?.createdAt), { addSuffix: true }) : '';



    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {/* Job Title and Company Name */}
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{singleJob?.title}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">{singleJob?.company?.name}</p>

                {/* Job Details: Position, Type, Location */}
                <div className="flex items-center gap-6 mt-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>{singleJob?.position} | {singleJob?.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{singleJob?.location}</span>
                    </div>
                </div>

                {/* Salary and Openings */}
                <div className="flex items-center gap-6 mt-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <ReceiptIndianRupee size={16} />
                        <span>{singleJob?.salary} LPA</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{singleJob?.opening} openings</span>
                    </div>
                </div>

                {/* Experience Level */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Experience Level</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{singleJob?.experienceLevel}</p>
                </div>

                {/* Job Description */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Job Description</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{singleJob?.description}</p>
                </div>

                {/* Job Requirements */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Requirements</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
                        {singleJob?.requirements?.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </div>

                {/* Posting Dates */}
                <div className="flex gap-6 mt-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Posted: {postedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Applied: {singleJob?.applications.length}</span>
                    </div>
                </div>


                {/* Apply Button */}
                <div className="mt-8">
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`py-2 px-6 rounded-md ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default JobDescription;
