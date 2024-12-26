import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get(`https://tech-sphere-server.vercel.app/users/public/${user.email}`, { withCredentials: true })
            .then(data => setCurrentUser(data.data));
        }
    }, [user])

    const handleLogout = () => {
        logOutUser()
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 5);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: `${error.code}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    }

    const NavigationList = (
        <>
            <li>
                <NavLink to={`/`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#3b82f6]'} hover:text-[#3b82f6]`}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={`/add-blog`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#3b82f6]'} hover:text-[#3b82f6]`}>
                    Add Blog
                </NavLink>
            </li>
            <li>
                <NavLink to={`/all-blogs`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#3b82f6]'} hover:text-[#3b82f6]`}>
                    All Blogs
                </NavLink>
            </li>
            <li>
                <NavLink to={`/featured-blogs`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#3b82f6]'} hover:text-[#3b82f6]`}>
                    Featured Blogs
                </NavLink>
            </li>
            <li>
                <NavLink to={`/wishlist`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#3b82f6]'} hover:text-[#3b82f6]`}>
                    Wishlist
                </NavLink>
            </li>
            {!user ? (
                <>
                    <li>
                        <Link
                            to={`/login`}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-bold text-[#3b82f6] hover:text-blue-600 lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-blue-400 lg:to-[#3b82f6] lg:hover:from-blue-600 lg:hover:to-[#3b82f6] lg:text-white lg:hover:text-white"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/register`}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-bold text-[#3b82f6] hover:text-blue-600 lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-blue-400 lg:to-[#3b82f6] lg:hover:from-blue-600 lg:hover:to-[#3b82f6] lg:text-white lg:hover:text-white"
                        >
                            Register
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className="font-bold text-[#3b82f6] hover:text-blue-600 lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-blue-400 lg:to-[#3b82f6] lg:hover:from-blue-600 lg:hover:to-[#3b82f6] lg:text-white lg:hover:text-white"
                    >
                        Log Out
                    </button>
                </li>
            )}
        </>
    );

    return (
        <nav
            className={`w-full bg-white`}
        >
            <div className="w-[97%] mx-auto flex justify-between items-center px-4 py-2 sm:py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-2xl text-[#3b82f6] md:text-3xl font-audiowide inline-flex items-center gap-2 font-bold`}
                >
                    TechSphere
                </Link>


                {/* Desktop Navigation */}
                <ul className="hidden lg:flex lg:space-x-5 xl:space-x-6 items-center">

                    {NavigationList}

                    {(user && currentUser &&
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={currentUser.name}
                                        src={currentUser.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-[10px] z-[1] mt-3 w-auto p-3 shadow">
                                <p>User Name: {currentUser.name}</p>
                                <p>Email: {currentUser.email}</p>
                            </ul>
                        </div>
                    )}
                </ul>

                <div className="flex lg:hidden items-center gap-1 sm:gap-3">
                    {/* Avatar */}
                    {(user && currentUser &&
                        <div className="dropdown dropdown-end hidden min-[375px]:block lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        alt={currentUser.name}
                                        src={currentUser.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-[10px] z-[1] mt-3 w-auto p-3 shadow">
                                <p>User Name: {currentUser.name}</p>
                                <p>Email: {currentUser.email}</p>
                            </ul>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="block lg:hidden text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Dropdown for Small Devices */}
            <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 ${isMenuOpen && window.innerWidth < 768 ? "translate-y-0" : "translate-y-[-100%]"
                    } bg-white/95 text-black h-96 ${user ? 'p-16' : 'p-11'} md:hidden`}
                style={{ zIndex: 1000 }}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center space-y-4 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>

            {/* Sidebar for Medium Devices */}
            <div
                className={`fixed top-0 right-0 h-screen transition-transform duration-300 ${isMenuOpen && window.innerWidth >= 768 ? "translate-x-0" : "translate-x-full"
                    } bg-white/95 text-black w-72 hidden md:block lg:hidden`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center h-full space-y-6 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;