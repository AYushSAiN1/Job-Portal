import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogIn, LogOut, Menu, X, Plus } from 'lucide-react';
import { ModeToggle } from '../theme/mode-toggle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-transparent shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Job <span className="text-[#F83002] dark:text-[#9F0E0E]">Portal</span>
        </Link>

        {/* Mobile Menu Toggle Button and Avatar */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Link to="/profile" className="hover:opacity-80 transition">
              <Avatar className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:border-[#F83002] transition">
                <AvatarImage src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} alt="profile" />
                <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {user && (user.role === "admin" || user.role === "recruiter") ? (
            <>
              <Link
                to="/companies/create"
                className="px-4 py-2 flex gap-2 items-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] dark:hover:text-black transition"
              >
                <Plus size={20} /> Create Company
              </Link>
              <Link
                to="/jobs/create"
                className="px-4 py-2 flex gap-2 items-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] dark:hover:text-black transition"
              >
                <Plus size={20} /> Create Job
              </Link>
            </>
          ) : (
            <ul className="flex items-center gap-6 font-medium text-gray-800 dark:text-gray-200">
              <li><Link to="/" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Browse</Link></li>
            </ul>
          )}

          <ModeToggle />
          <div className="flex items-center gap-6">
            {!user ? (
              <Link
                to="/signin"
                className="px-4 py-2 flex gap-2 border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] transition"
              >
                <LogIn size={20} /> Sign In
              </Link>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer border border-gray-300 dark:border-gray-600 hover:border-[#F83002] transition">
                    <AvatarImage src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} alt="profile" />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} alt="profile" />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-base">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.profile?.bio || "No bio available"}</p>
                    </div>
                  </Link>
                  <hr className="border-gray-300 dark:border-gray-600 my-2" />
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition w-full"
                  >
                    <LogOut size={20} /> Log Out
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col p-6 transition-transform duration-300 ease-in-out">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
              className="text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X size={28} />
            </button>
          </div>

          {
            user && (user.role === "admin" || user.role === "recruiter") ?
              <div className="mt-4">
                <Link
                  to="/companies/create"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-2 text-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] dark:hover:text-black transition mb-2"
                >
                  Create Company
                </Link>
                <Link
                  to="/jobs/create"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-2 text-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] dark:hover:text-black transition"
                >
                  Create Job
                </Link>
              </div>
              :
              < ul className="flex flex-col gap-4 font-medium text-gray-800 dark:text-gray-200">
                <li><Link to="/" onClick={toggleMobileMenu} className="block py-2 hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMobileMenu} className="block py-2 hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Jobs</Link></li>
                <li><Link to="/browse" onClick={toggleMobileMenu} className="block py-2 hover:text-[#F83002] dark:hover:text-[#9F0E0E] transition">Browse</Link></li>
              </ul>

          }

          {/* Log Out Button */}
          <div className="mt-6">
            {!user ? (
              <Link
                to="/signin"
                onClick={toggleMobileMenu}
                className="block px-4 py-2 text-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] transition"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-center text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition mt-2"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )
      }
    </div >
  );
}

export default Navbar;