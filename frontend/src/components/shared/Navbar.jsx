import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Book, LogIn, LogOut, User2, Plus, Building, Menu, X } from 'lucide-react';
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

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-medium text-gray-800 dark:text-gray-200">
            <li><Link to="/" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E]">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E]">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-[#F83002] dark:hover:text-[#9F0E0E]">Browse</Link></li>
          </ul>
          <ModeToggle />
          <div className="flex items-center gap-6">
            {!user ? (
              <Link to="/signin" className="px-4 py-2 flex gap-2 border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] transition">
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
                  <hr className="border-gray-300 dark:border-gray-600" />
                  <button onClick={logoutHandler} className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition">
                    <LogOut size={20} /> Log Out
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg p-4">
          <ul className="flex flex-col gap-4 font-medium text-gray-800 dark:text-gray-200">
            <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link to="/jobs" onClick={toggleMobileMenu}>Jobs</Link></li>
            <li><Link to="/browse" onClick={toggleMobileMenu}>Browse</Link></li>
          </ul>
          <div className="mt-4">
            {!user ? (
              <Link to="/signin" onClick={toggleMobileMenu} className="block px-4 py-2 text-center border rounded-lg text-[#F83002] border-[#F83002] hover:bg-[#F83002] hover:text-white dark:border-[#9F0E0E] dark:text-[#9F0E0E] dark:hover:bg-[#9F0E0E] transition">
                Sign In
              </Link>
            ) : (
              <button onClick={logoutHandler} className="block w-full px-4 py-2 text-center text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition">
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
