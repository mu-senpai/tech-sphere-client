import { motion } from "framer-motion";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const BlogCard = (props = {}) => {

    const { blog } = props || {};
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [isWishlisted, setIsWishisted] = useState(false);

    const formattedDate = format(new Date(blog.date), "MMM dd, yyyy");

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/users/${user.email}`)
                .then(data => setCurrentUser(data.data));

            axios.get('https://tech-sphere-server.vercel.app/wishlist')
                .then(data => {
                    const listedItem = data.data.find(item => ((item.email === user.email) && (item.title === blog.title)));
                    if (listedItem) {
                        setIsWishisted(true);
                    }
                })
        }
    }, [user, axiosSecure, blog])

    const handleWishlist = () => {
        if (!user) {
            navigate('/login');
        }

        if (user) {
            const wishListItem = {
                email: currentUser.email,
                blogId: blog._id,
                title: blog.title,
                category: blog.category
            }

            axiosSecure.post('/wishlist', wishListItem)
                .then((response) => {
                    if (response.data.insertedId) {
                        setIsWishisted(true);
                        Swal.fire({
                            title: "Success!",
                            text: `The blog "${blog.title}" has been added to your wishlist successfully!`,
                            icon: "success",
                            confirmButtonText: "Close",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(error.code);
                });
        }
    }

    return (
        <motion.div
            className="w-full p-6 bg-base-100 border rounded-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col md:flex-row gap-6">

                <figure className="flex-shrink-0">
                    <img
                        src={blog.imageUrl || "https://via.placeholder.com/300"}
                        alt="Blog Thumbnail"
                        className="rounded-lg object-cover object-center w-full md:w-60 lg:w-72 h-72 sm:h-96 md:h-full"
                    />
                </figure>

                <div className="flex flex-col gap-3 flex-grow">
                    <div className="mb-2">
                        <span className="badge lg:badge-lg bg-blue-500 text-xs lg:text-sm font-bold text-white px-4 py-2 uppercase">
                            {blog.category}
                        </span>
                    </div>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                        {blog.title}
                    </h2>

                    <p className="text-sm md:text-base lg:text-lg text-gray-600 my-3 line-clamp-3 flex-grow">
                        {blog.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-row justify-between items-center sm:items-center gap-4">
                        <div className="text-sm md:text-base text-gray-500">
                            <span>{formattedDate}</span>
                        </div>

                        <div className="flex gap-3">
                            <Link to={`/blog/${blog._id}`} className="btn btn-sm lg:btn-md border-none bg-gradient-to-r from-blue-400 to-[#3b82f6] hover:from-blue-600 hover:to-[#3b82f6] text-white rounded-md">
                                Details
                            </Link>
                            <button onClick={handleWishlist} className={`${isWishlisted ? 'btn-disabled' : ''} btn btn-ghost border border-gray-600 hover:bg-blue-500 hover:text-white hover:border-none btn-sm lg:btn-md rounded-md`}>
                                Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
