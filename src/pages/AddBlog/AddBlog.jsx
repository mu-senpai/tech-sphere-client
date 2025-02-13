import { useState, useContext } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import blogAnimation from "../../assets/blogging.json";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [blogData, setBlogData] = useState({
        title: "",
        imageUrl: "",
        category: "",
        shortDescription: "",
        longDescription: "",
    });

    const categories = ["Technology", "Programming", "AI", "Cybersecurity", "Web Development"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const processBlogData = (data) => {
        const processedData = {
            ...data,
            longDescription: data.longDescription
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim() !== ""), // Convert into paragraphs here
        };
        return processedData;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const processedBlogData = processBlogData(blogData);

        const blogPost = {
            ...processedBlogData,
            name: user?.displayName || "Anonymous",
            email: user?.email,
            date: new Date().toISOString(),
        };

        axiosSecure
            .post("/blogs", blogPost)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your blog has been posted successfully!",
                        icon: "success",
                        confirmButtonText: "Close",
                    });
                    setBlogData({
                        title: "",
                        imageUrl: "",
                        category: "",
                        shortDescription: "",
                        longDescription: "",
                    });
                }
            })
            .catch((error) => {
                toast.error(error.code);
            });
    };

    return (
        <div
            className="min-h-screen 2xl:min-h-[60rem] grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-[90%] mx-auto p-4 md:p-8 my-10 sm:my-16 lg:my-20 2xl:my-28">

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block">
                <Lottie animationData={blogAnimation} loop={true} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10">Add a New <span className="text-blue-500">Blog</span></h1>
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="form-control">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                value={user?.displayName || "Anonymous"}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                value={user?.email || "Not Available"}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleInputChange}
                            placeholder="Enter blog title"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={blogData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Enter image URL"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Category</label>
                        <select
                            name="category"
                            value={blogData.category}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Short Description</label>
                        <textarea
                            name="shortDescription"
                            value={blogData.shortDescription}
                            onChange={handleInputChange}
                            placeholder="Write a short description"
                            className="textarea textarea-bordered w-full resize-none"
                            required
                        ></textarea>
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">Long Description</label>
                        <textarea
                            name="longDescription"
                            value={blogData.longDescription}
                            onChange={handleInputChange}
                            placeholder="Write the full blog content"
                            className="textarea textarea-bordered w-full resize-none"
                            rows="6"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn w-full border-none bg-gradient-to-r from-blue-400 to-[#3b82f6] hover:from-blue-600 hover:to-[#3b82f6] text-white"
                    >
                        Post Blog
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddBlog;
