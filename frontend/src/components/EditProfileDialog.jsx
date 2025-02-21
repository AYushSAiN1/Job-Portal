import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from "../redux/authSlice";
import { USER_API_ENDPOINT } from '@/utils/constant';

function EditProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        resume: null, // Initialize as null instead of string
        profilePhoto: null, // Initialize as null instead of string
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, [e.target.name]: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.profilePhoto && input.profilePhoto instanceof File) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        if (input.resume && input.resume instanceof File) {
            formData.append("resume", input.resume);
        }


        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg  p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile details and upload your resume or profile picture.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input name="fullname" className="border border-gray-200 dark:border-gray-700 rounded-md" value={input.fullname} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Bio</Label>
                            <Textarea name="bio" className="border border-gray-200 dark:border-gray-700 rounded-md" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        {user?.role !== "recruiter" && (
                            <div>
                                <Label>Skills</Label>
                                <Input name="skills" className="border border-gray-200 dark:border-gray-700 rounded-md" value={input.skills} onChange={changeEventHandler} />
                            </div>
                        )}
                        <div>
                            <Label>Phone Number</Label>
                            <Input name="phoneNumber" className="border border-gray-200 dark:border-gray-700 rounded-md" value={input.phoneNumber} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Profile Photo</Label>
                            <Input name="profilePhoto" className="border border-gray-200 dark:border-gray-700 rounded-md" type="file" accept="image/*" onChange={fileChangeHandler} />
                        </div>
                        {user?.role !== "recruiter" && (
                            <div>
                                <Label>Resume</Label>
                                <Input name="resume" className="border border-gray-200 dark:border-gray-700 rounded-md" type="file" accept="application/pdf" onChange={fileChangeHandler} />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end gap-2 mt-8">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
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

export default EditProfileDialog;
