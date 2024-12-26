import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BlogCard from "../common/BlogCard/BlogCard";
import Lottie from "lottie-react";
import blogAnimation from "../../assets/blog.json";
import { toast } from "react-toastify";
import LoadingPage from "../common/LoadingPage/LoadingPage";
import { AuthContext } from "../../providers/AuthProvider";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { dataLoading, setDataLoading } = useContext(AuthContext);

    const categories = ["All", "Technology", "Programming", "AI", "Cybersecurity", "Web Development"];

    const fetchBlogs = async () => {
        try {
            const params = {};
            if (category !== "All") params.category = category;
            if (searchQuery) params.search = searchQuery;

            const queryString = new URLSearchParams(params).toString();
            const url = `https://tech-sphere-server.vercel.app/blogs${queryString ? `?${queryString}` : ''}`;

            const response = await axios.get(url);
            setBlogs(response.data);
        } catch (error) {
            toast.error("Failed to fetch blogs:", error);
        }
    };

    useEffect(() => {
        setDataLoading(true);
        fetchBlogs();
        setDataLoading(false);
    }, [category, searchQuery]);

    if (dataLoading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <section className="w-[90%] lg:w-[85%] min-h-screen 2xl:min-h-[60rem] mx-auto my-10 sm:my-12 md:my-16 lg:my-20">

            <div
                className="flex flex-col lg:flex-row items-center justify-between mb-8 lg:mb-12"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left flex-grow">
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-500 mb-4">
                        Explore All Blogs
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                        Discover a world of knowledge with our curated collection of blogs
                        across multiple topics.
                    </p>
                </motion.div>

                <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block w-[20rem] xl:w-[25rem]">
                    <Lottie animationData={blogAnimation} loop={true} />
                </motion.div>
            </div>

            <div
                className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">

                <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    type="text"
                    placeholder="Search by blog title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full lg:w-[40%] border-gray-300"
                />

                <motion.select
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="select select-bordered w-full lg:w-[30%] border-gray-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </motion.select>
            </div>

            <div className="w-full space-y-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </section>
    );
};

export default AllBlogs;
