import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-5 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm text-center sm:text-left">

                    {/* About Section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">About Us</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-snug">
                            Connecting talented individuals with top employers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="#jobs" className="hover:text-blue-600 transition">Latest Jobs</a></li>
                            <li><a href="#about" className="hover:text-blue-600 transition">About Us</a></li>
                            <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
                            <li><a href="#faq" className="hover:text-blue-600 transition">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Contact</h3>
                        <ul className="space-y-1">
                            <li className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> support@jobhunt.com</li>
                            <li className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> +1 234 567 890</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Follow Us</h3>
                        <div className="flex justify-center sm:justify-start space-x-3">
                            <a href="https://facebook.com" className="hover:text-blue-600 transition"><Facebook className="w-4 h-4" /></a>
                            <a href="https://twitter.com" className="hover:text-blue-600 transition"><Twitter className="w-4 h-4" /></a>
                            <a href="https://instagram.com" className="hover:text-blue-600 transition"><Instagram className="w-4 h-4" /></a>
                            <a href="https://linkedin.com" className="hover:text-blue-600 transition"><Linkedin className="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-3 text-center text-xs text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Job Hunt. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
