import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

function AddCompanyForm() {
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [companyLocation, setCompanyLocation] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        setCompanyLogo(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("description", companyDescription);
        formData.append("website", companyWebsite);
        formData.append("location", companyLocation);
        if (companyLogo && companyLogo instanceof File) {
            formData.append("companyLogo", companyLogo);
        }


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });


            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/companies");
            }
            setCompanyName("");
            setCompanyDescription("");
            setCompanyWebsite("");
            setCompanyLocation("");
            setCompanyLogo(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };


    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className="min-h-screen flex flex-col items-center  dark:bg-transparent text-gray-900 dark:text-gray-100">
                <div className="w-full max-w-lg mt-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Add Company</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Fill in the details to add a new company.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label>Company Name*</Label>
                                <Input type="text" className="border border-gray-200 dark:border-gray-700 rounded-md" placeholder="JobHunt, Microsoft etc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </div>
                            <div>
                                <Label> Description*</Label>
                                <Textarea placeholder="Brief description of the company" className="border border-gray-200 dark:border-gray-700 rounded-md" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} />
                            </div>
                            <div>
                                <Label> Website*</Label>
                                <Input type="text" className="border border-gray-200 dark:border-gray-700 rounded-md" placeholder="https://companywebsite.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                            </div>
                            <div>
                                <Label> Location*</Label>
                                <Input type="text" className="border border-gray-200 dark:border-gray-700 rounded-md" placeholder="City, Country" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} />
                            </div>
                            <div>
                                <Label>Company Logo</Label>
                                <Input type="file" className="border border-gray-200 dark:border-gray-700 rounded-md" accept="image/*" onChange={handleLogoUpload} />
                                {companyLogo && (
                                    <img src={URL.createObjectURL(companyLogo)} alt="Company Logo Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <Button variant="outline" onClick={() => navigate("/companies")}>Cancel</Button>
                            {
                                loading ? <Button > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" type="submit">Continue</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCompanyForm;
