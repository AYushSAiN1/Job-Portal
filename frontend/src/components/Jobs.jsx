import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';


function Jobs() {
    const { allJobs } = useSelector(state => state.job);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className="flex gap-8 ">
                    <div className="w-[20%] lg:w-[20%]">
                        <FilterCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5 scrollbar-hide'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        allJobs?.map((job, index) => (
                                            <JobCard key={job?._id} job={job} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Jobs;