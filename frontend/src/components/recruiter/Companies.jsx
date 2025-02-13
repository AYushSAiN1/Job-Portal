import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusCircle, Search } from "lucide-react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchedCompany } from "@/redux/companySlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Companies() {
    useGetAllCompanies();
    useGetAllJobs();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle navigation to create company page
    const handleAddCompany = () => {
        navigate("/companies/create");
    };

    const [searchCompany, setSearchCompany] = useState("");

    useEffect(() => {
        dispatch(setSearchedCompany(searchCompany));
    }, [searchCompany]
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-transparent text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Page Container */}
            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Companies</h1>

                    {/* Add Company Button */}
                    <Button
                        onClick={handleAddCompany}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center px-4 py-2 rounded-md"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        Add Company
                    </Button>
                </div>

                {/* Filter Input */}
                <div className="relative flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                    <Search size={20} className="absolute left-3 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search companies..."
                        onChange={(e) => setSearchCompany(e.target.value)}
                        className="w-full pl-10"
                    />
                </div>
            </div>

            {/* Companies Table */}
            <div className="mt-12">
                <CompaniesTable />
            </div>
        </div>
    );
}

export default Companies;
