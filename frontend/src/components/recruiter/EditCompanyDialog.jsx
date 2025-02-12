import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

function EditCompanyDialog({ open, setOpen, company }) {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        location: "",
        website: "",
        description: "",
        companyLogo: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (company) {
            setInput({
                name: company.name || "",
                location: company.location || "",
                website: company.website || "",
                description: company.description || "",
                companyLogo: null,
            });
        }
    }, [company]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, companyLogo: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", input.name);
        formData.append("location", input.location);
        formData.append("website", input.website);
        formData.append("description", input.description);

        if (input.companyLogo && input.companyLogo instanceof File) {
            formData.append("companyLogo", input.companyLogo);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${company._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company));
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setInput({
                        name: company?.name || "",
                        location: company?.location || "",
                        website: company?.website || "",
                        description: company?.description || "",
                        companyLogo: null,
                    });
                }
            }}
        >
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Edit Company</DialogTitle>
                    <DialogDescription>Update your company details and logo.</DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input name="website" value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Company Logo</Label>
                            <Input name="companyLogo" type="file" accept="image/*" onChange={fileChangeHandler} />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end gap-2 mt-8">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        {loading ? (
                            <Button>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" type="submit">Save</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditCompanyDialog;
