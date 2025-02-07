import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export const HeroSection = () => {
    return (
        <div className="relative bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 min-h-[45vh] flex items-center flex-col text-center px-4 sm:px-6 lg:px-8 mt-20">
            <div className="relative max-w-4xl mx-auto">
                <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white bg-red-500 dark:bg-[#9F0E0E] rounded-full">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                    Search, Apply & Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00008b] via-[#ff00ff] to-[#ff00ff]">Dream Jobs</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl font-bold-900 text-gray-600 dark:text-gray-400 mb-6">
                    Unlock endless opportunities and connect with top employers to take the next step in your career journey. Your dream job is just a search away!
                </p>
                <div className="flex items-center w-full max-w-2xl mx-auto">
                    <Input
                        type="text"
                        placeholder="Find your dream jobs"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                    <Button className="px-6 py-3 text-lg bg-pink-600 dark:bg-pink-600 text-white font-medium rounded-r-md shadow-md hover:bg-pink-700 dark:hover:bg-pink-600 transition-all flex items-center justify-center">
                        <Search className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default HeroSection;
