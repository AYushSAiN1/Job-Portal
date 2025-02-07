import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, } from 'react-feather';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10">
            <div className="max-w-8xl mx-auto px-4 mt-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            We are the leading platform connecting talented individuals with top employers. Your dream job is just a click away!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#jobs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Latest Jobs</a></li>
                            <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">About Us</a></li>
                            <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Contact</a></li>
                            <li><a href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li><span className="block text-gray-600 dark:text-gray-400">Email:</span> support@jobhunt.com</li>
                            <li><span className="block text-gray-600 dark:text-gray-400">Phone:</span> +1 234 567 890</li>
                            <li><span className="block text-gray-600 dark:text-gray-400">Address:</span> 123 Dream Jobs Lane, Success City, USA</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://linkedin.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Job Hunt. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
