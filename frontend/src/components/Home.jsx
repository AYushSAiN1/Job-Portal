import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { HeroSection } from './HeroSection';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if ((user?.role === "recruiter" || user?.role === "admin") && location.pathname !== "/companies") {
            navigate("/companies");
        }
    }, [user, navigate, location.pathname]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
                <LatestJobs />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
