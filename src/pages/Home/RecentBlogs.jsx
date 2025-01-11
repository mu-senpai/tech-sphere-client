import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BlogCard from "../common/BlogCard/BlogCard";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://tech-sphere-server.vercel.app/recent-blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch recent blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-[90%] lg:w-[85%] mx-auto my-10 sm:my-12 md:my-16 lg:my-20">
    
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-blue-500 mb-4 lg:mb-6">
          Our Recent Blogs
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-center text-gray-600 mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
          Stay updated with our latest articles and insights.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 sm:gap-4 md:gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
