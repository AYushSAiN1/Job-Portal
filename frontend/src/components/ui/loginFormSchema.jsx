"use client";
import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form";
import { Input } from "./input";
import { USER_API_ENDPOINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters." }),
});

export function LoginForm() {
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Submit handler
    async function onSubmit(values) {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`${USER_API_ENDPOINT}/signin`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 w-full max-w-lg">
                <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center">
                    Login to <span className="text-[#F83002] dark:text-[#9F0E0E]">Job Portal</span>
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        {/* Password */}
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"} {...field} placeholder="Enter your password" />
                                        <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        {/* Submit Button */}
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
