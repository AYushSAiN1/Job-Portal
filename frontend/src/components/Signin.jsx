import { useState } from "react";
import { SignupForm } from "./ui/signupFormSchema";
import { LoginForm } from "./ui/loginFormSchema";
import Navbar from "@/components/shared/Navbar";
import Footer from "./shared/Footer";

const Signin = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div>
            <Navbar />
            <div className="flex justify-center max-h-screen dark:bg-transparent mt-8 mb-14">
                <div className="w-full max-w-lg bg-white dark:bg-transparent rounded-lg shadow-lg border-2 border-gray p-8">
                    {/* Tab Navigation */}
                    <div className="flex justify-center border-b border-gray-300 dark:border-gray-700 mb-6">
                        <button
                            className={`text-lg font-medium px-6 py-3 transition-colors ${activeTab === "login"
                                ? "border-b-4 border-[#F83002] text-[#F83002] dark:text-[#9F0E0E] dark:border-[#9F0E0E]"
                                : "text-gray-600 dark:text-gray-400 hover:text-[#F83002]"
                                }`}
                            onClick={() => setActiveTab("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`text-lg font-medium px-6 py-3 transition-colors ${activeTab === "signup"
                                ? "border-b-4 border-[#F83002] text-[#F83002] dark:text-[#9F0E0E] dark:border-[#9F0E0E]"
                                : "text-gray-600 dark:text-gray-400 hover:text-[#F83002]"
                                }`}
                            onClick={() => setActiveTab("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="transition-all duration-300 ">
                        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
                    </div>

                    {/* Animated Message */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {activeTab === "login" ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <span
                                    className="text-[#F83002] cursor-pointer hover:underline"
                                    onClick={() => setActiveTab("signup")}
                                >
                                    Sign Up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span
                                    className="text-[#F83002] cursor-pointer hover:underline"
                                    onClick={() => setActiveTab("login")}
                                >
                                    Log In
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signin;
