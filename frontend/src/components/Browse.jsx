import React from 'react';
import Navbar from './shared/Navbar';
import JobCard from './JobCard';
import Footer from './shared/Footer';

const browsedJobs = [1, 2, 3, 4, 5];

function Browse() {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({browsedJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        browsedJobs.map((job) => {
                            return (
                                <JobCard />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse;