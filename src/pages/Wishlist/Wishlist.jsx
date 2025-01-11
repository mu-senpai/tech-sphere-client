import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import lottieData from "../../assets/wishlist.json";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingPage from "../common/LoadingPage/LoadingPage";
import { Link } from "react-router-dom";

const Wishlist = () => {

    const [wishlistedBlogs, setWishlistBlogs] = useState([]);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { dataLoading, setDataLoading } = useContext(AuthContext);

    useEffect(() => {
        setDataLoading(true);

        axiosSecure.get(`/wishlist/${user.email}`)
            .then(data => setWishlistBlogs(data.data));

        setDataLoading(false);
    }, [user, axiosSecure])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setWishlistBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
                            Swal.fire({
                                title: "Success!",
                                text: `An item has been deleted from your wishlist successfully!`,
                                icon: "success",
                                confirmButtonText: "Close",
                            });
                        }
                    })
                    .catch(err => toast.error("Error deleting wishlist item:", err.code));
            }
        });
    };

    if (dataLoading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <section
            className="w-[90%] lg:w-[85%] min-h-screen 2xl:min-h-[60rem] mx-auto my-10 sm:my-12 md:my-16 lg:my-20"
        >
            <div
                className="flex flex-col lg:flex-row items-center justify-between my-10 sm:my-12 md:my-16 lg:my-20"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left flex-grow">
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-500 mb-4">
                        Wishlisted Blogs
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                        Explore your saved blogs, curated for easy access and personalized learning journeys.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:block w-[20rem] xl:w-[25rem]">
                    <Lottie animationData={lottieData} loop={true} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="overflow-x-auto">
                <table className="table md:table-lg w-[37rem] sm:w-full border">

                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th className="text-blue-500 text-base md:text-lg">Title</th>
                            <th className="text-blue-500 text-base md:text-lg">Category</th>
                            <th className="text-blue-500 text-base md:text-lg">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            wishlistedBlogs.map(blog => <motion.tr
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 ,duration: 0.6, ease: "easeOut" }}
                            className="hover:bg-blue-500/15"
                            key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.category}</td>
                                <td className="flex items-center gap-3">
                                    <Link to={`/blog/${blog.blogId}`} className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white"><FaEye></FaEye></Link>
                                    <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-ghost border border-gray-600 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-none"><FaTrash></FaTrash></button>
                                </td>
                            </motion.tr>
                            )
                        }
                    </tbody>
                </table>
            </motion.div>
        </section>
    );
};

export default Wishlist;