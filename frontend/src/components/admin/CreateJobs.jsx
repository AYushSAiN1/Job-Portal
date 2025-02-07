import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "../shared/Navbar";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOBS_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

function CreateJobs() {
    const { loading } = useSelector(store => store.auth);
    const { allCompanies } = useSelector(store => store.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        position: "",
        experience: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        opening: "",
        companyId: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);

    useEffect(() => {
        // Filter companies whenever searchQuery changes
        setFilteredCompanies(
            allCompanies.filter((company) =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, allCompanies]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${JOBS_API_ENDPOINT}/post`, formData, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Post a New Job
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Job Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Job Title
                            </label>
                            <Input
                                name="title"
                                className="border border-gray-200 dark:border-gray-700 rounded-md"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Software Engineer"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Position
                            </label>
                            <Input
                                name="position"
                                className="border border-gray-200 dark:border-gray-700 rounded-md"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Frontend Developer"
                                required
                            />
                        </div>
                    </div>

                    {/* Experience & Job Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Experience Level
                            </label>
                            <Select
                                onValueChange={(value) =>
                                    setFormData({ ...formData, experience: value })
                                }
                            >
                                <SelectTrigger className="border border-gray-200 dark:border-gray-700 rounded-md">
                                    <SelectValue placeholder="Select Experience Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Entry Level">Entry Level (0-2 years)</SelectItem>
                                    <SelectItem value="Mid Level">Mid Level (3-5 years)</SelectItem>
                                    <SelectItem value="Senior Level">Senior Level (6+ years)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Job Type
                            </label>
                            <Select
                                onValueChange={(value) =>
                                    setFormData({ ...formData, jobType: value })
                                }
                            >
                                <SelectTrigger className="border border-gray-200 dark:border-gray-700 rounded-md">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Salary & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Annual Salary (LPA)
                            </label>
                            <Input
                                name="salary"
                                className="border border-gray-200 dark:border-gray-700 rounded-md"
                                type="number"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Enter annual salary in LPA"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Location
                            </label>
                            <Input
                                name="location"
                                className="border border-gray-200 dark:border-gray-700 rounded-md"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Remote / City, Country"
                                required
                            />
                        </div>
                    </div>

                    {/* Job Description & Requirements */}
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                            Job Description
                        </label>
                        <Textarea
                            name="description"
                            className="border border-gray-200 dark:border-gray-700 rounded-md"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe job responsibilities..."
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                            Requirements (One per line)
                        </label>
                        <Textarea
                            name="requirements"
                            className="border border-gray-200 dark:border-gray-700 rounded-md"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="Requirements per line..."
                            rows={3}
                            required
                        />
                    </div>

                    {/* Company Selection */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Company
                            </label>
                            <Select
                                value={formData.companyId}
                                onValueChange={(value) => {
                                    const selectedCompany = allCompanies.find(c => c._id === value);
                                    setFormData({
                                        ...formData,
                                        companyId: value,
                                        companyName: selectedCompany?.name || ''
                                    });
                                }}
                                onOpenChange={(isOpen) => {
                                    if (!isOpen) {
                                        setSearchQuery('');
                                    }
                                }}
                            >
                                <SelectTrigger className="border border-gray-200 dark:border-gray-700 rounded-md">
                                    <SelectValue placeholder="Select Company">
                                        {formData.companyName}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent className="max-h-60 overflow-auto z-50">
                                    {/* Search input with auto-focus */}
                                    <div className="p-2">
                                        <Input
                                            ref={(inputRef) => inputRef?.focus()} // Auto-focus when dropdown opens
                                            placeholder="Search for a company..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full border-none focus:ring-0"
                                        />
                                    </div>

                                    {/* Filtered companies list */}
                                    {filteredCompanies.length > 0 ? (
                                        filteredCompanies.map((company) => (
                                            <SelectItem key={company._id} value={company._id}>
                                                {company.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem disabled value="no-results">
                                            No companies found? Register your own company!
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                                Positions Available
                            </label>
                            <Input
                                name="opening"
                                className="border border-gray-200 dark:border-gray-700 rounded-md"
                                type="number"
                                value={formData.opening}
                                onChange={handleChange}
                                placeholder="Number of positions available"
                                required
                            />
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-end gap-2 mt-8">
                        <Button variant="outline" onClick={() => navigate("/companies")}>Cancel</Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" type="submit">
                            {loading ? "Posting..." : "Post Job"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateJobs;
