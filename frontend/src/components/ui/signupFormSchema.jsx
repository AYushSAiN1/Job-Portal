"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { USER_API_ENDPOINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
  role: z.enum(["student", "recruiter"], {
    message: "Please select either 'student' or 'recruiter'.",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  file: z.instanceof(File).optional().or(z.literal("")),



});

export function SignupForm() {
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "student",
      phoneNumber: "",
      file: "",
    },
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Submit handler
  async function onSubmit(values) {

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      formData.append("phoneNumber", values.phoneNumber);

      if (values.file && values.file instanceof File) {
        formData.append("file", values.file);
      }


      const response = await axios.post(`${USER_API_ENDPOINT}/signup`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Sign Up failed");
    } finally {
      dispatch(setLoading(false));
    }
  }






  return (
    <div className="flex items-center justify-center  ">
      < div className=" p-8 w-full max-w-lg" >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Sign Up to <span className="text-[#F83002] dark:text-[#9F0E0E]">Job Portal</span>
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" encType="multipart/form-data">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    Full Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-[#F83002] focus:border-[#F83002]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">Email*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-[#F83002] focus:border-[#F83002]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    Password*
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-[#F83002] focus:border-[#F83002]"
                      />
                      <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Role Selection */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mt-0 !mt-0">Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-6"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="student" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal ml-2 mt-0 !mt-0">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="recruiter" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal ml-2 mt-0 !mt-0">Recruiter</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    Phone Number*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-[#F83002] focus:border-[#F83002]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Profile Picture Upload */}
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null; // Ensure controlled behavior
                        onChange(file);
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />




            {/* Submit Button */}
            {loading ? (
              <Button
                disabled
                className="w-full bg-[#F83002] text-white py-3 rounded-md shadow-md flex items-center justify-center"
              >
                <Loader2
                  className="mr-2 h-5 w-5 animate-spin text-white"
                />
                Signing in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#F83002] hover:bg-[#dc2c00] text-white dark:bg-[#9F0E0E] py-3 rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#F83002] focus:outline-none transition duration-150 ease-in-out text-sm font-semibold"
              >
                Sign Up
              </Button>
            )}
          </form>
        </Form>
      </div >
    </div >
  );
}