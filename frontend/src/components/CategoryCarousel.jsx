import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Card, CardContent, CardHeader } from './ui/card';

export const CategoryCarousel = () => {
    const categories = [
        "Technology",
        "Design",
        "Marketing",
        "Sales",
        "Finance",
        "Engineering",
        "HR",
        "Education",
        "Healthcare",
        "Consulting",
    ];

    const scrollRef = useRef(null);

    // Scroll right
    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
        }
    };

    // Scroll left
    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -180, behavior: "smooth" });
        }
    };

    return (
        <div className="py-8 bg-transparent">
            <div className="max-w-[85vw] mx-auto px-6 sm:px-8">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                    Explore Categories
                </h2>

                <div className="relative">
                    {/* Category Cards Container */}
                    <div
                        ref={scrollRef}
                        className="flex items-center gap-6 overflow-hidden"
                    >
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-36 h-auto bg-white dark:bg-transparent rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition-all p-1 cursor-pointer"
                            >
                                <div className="text-center">
                                    <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                                        {category}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Left Navigation Button */}
                    <button
                        onClick={handleScrollLeft}
                        className="absolute  left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-transparent text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-all "
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    {/* Right Navigation Button */}
                    <button
                        onClick={handleScrollRight}
                        className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-transparent text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};