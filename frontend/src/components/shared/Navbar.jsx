import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Book, LogIn, LogOut, User2, Plus, Building } from 'lucide-react'; // Added Building icon
import { ModeToggle } from '../theme/mode-toggle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Briefcase } from 'react-feather';

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="bg-white dark:bg-transparent dark:text-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002] dark:text-[#9F0E0E]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">
            {/* Display options for recruiter */}
            {user?.role === 'recruiter' ? (
              <>
                <li className="relative">
                  {/* Company Button */}
                  <Link
                    to="/companies"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F83002] dark:hover:bg-[#9F0E0E] hover:text-white transition-colors duration-300"
                  >
                    <Building size={20} />
                    <span>Company</span>
                  </Link>
                </li>
                <li className="relative">
                  {/* Create Job Button */}
                  <Link
                    to="/jobs/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F83002] dark:bg-[#9F0E0E] text-white hover:bg-[#F83002]/80 dark:hover:bg-[#9F0E0E]/80 transition-colors duration-300"
                  >
                    <Plus size={20} />
                    <span>Create Job</span>
                  </Link>
                </li>
                <ModeToggle />
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] dark:hover:text-[#9F0E0E] cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
                <ModeToggle />
              </>
            )}
          </ul>

          {/* Avatar and Profile Options */}
          <div className="flex gap-6 items-center">
            {/* If the user is logged out, show Sign In button and Dark Mode Toggle */}
            {!user ? (
              <>
                <Link
                  to="/signin"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#F83002] dark:border-[#9F0E0E] text-[#F83002] dark:text-[#9F0E0E] hover:bg-[#F83002] dark:hover:bg-[#9F0E0E] hover:text-white text-sm transition-colors duration-300"
                >
                  <LogIn size={20} />
                  <span>Sign In</span>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 transition">
                    <AvatarImage src={user?.profile.profilePhoto || "https://via.placeholder.com/150"} alt="profile" />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:text-gray-100">
                  <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">

                    {/* User Info */}
                    <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.profile.profilePhoto || "https://via.placeholder.com/150"} alt="profile" />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-base">{user?.fullname}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.profile?.bio || "No bio available"}</p>
                      </div>
                    </Link>

                    <hr className="border-gray-300 dark:border-gray-600" />
                    {
                      user?.role === 'recruiter' ?
                        <Link className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                          <h4 className="flex gap-2 font-semibold text-base"> <Briefcase></Briefcase>Your Jobs</h4>

                        </Link> : <></>
                    }
                    {/* Logout */}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer transition text-red-600 dark:text-red-400"
                      aria-label="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-medium">Log Out</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
