import React from 'react';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Button } from './ui/button';

function FilterCard() {
    return (
        <div className="bg-white dark:bg-gray-800 w-full rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Filter Jobs</h2>

            {/* Job Type Filter */}
            <div className="mb-5">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                        <Checkbox /> <span className="text-gray-600 dark:text-gray-400">Full Time</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <Checkbox /> <span className="text-gray-600 dark:text-gray-400">Part Time</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <Checkbox /> <span className="text-gray-600 dark:text-gray-400">Internship</span>
                    </label>
                </div>
            </div>

            {/* Salary Range Filter */}
            <div className="mb-5">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Salary Range</h3>
                <Slider defaultValue={[50]} max={100} step={10} className="mt-2" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Up to $50,000</p>
            </div>

            {/* Location Filter */}
            <div className="mb-5">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Location</h3>
                <Input
                    type="text"
                    placeholder="Enter city or state"
                    className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-gray-100"
                />
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 text-white font-medium rounded-md py-2">
                Apply Filters
            </Button>
        </div>
    );
}

export default FilterCard;
