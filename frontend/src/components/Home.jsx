import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { HeroSection } from './HeroSection';
import { CategoryCarousel } from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();  // 🔹 Get current route

    useEffect(() => {
        if ((user?.role === "recruiter" || user?.role === "admin") && location.pathname !== "/companies") {
            navigate("/companies");
        }
    }, [user, navigate, location.pathname]);  // 🔹 Add location.pathname as a dependency

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    );
};

export default Home;
