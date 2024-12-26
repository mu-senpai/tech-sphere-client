import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../common/LoadingPage/LoadingPage";
import axios from "axios";
import { format } from "date-fns";

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentUser, setCurrentUser] = useState({});

    
    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`)
        .then((response) => setCurrentUser(response.data));
        
        axios.get(`https://tech-sphere-server.vercel.app/blogs/${id}`).then((response) => {
            setBlog(response.data);
        });
        
        axios.get(`https://tech-sphere-server.vercel.app/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id, user, axiosSecure]);

    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        axiosSecure
            .post(`/comments`, {
                blogId: id,
                text: newComment,
                userName: currentUser.name,
                userProfilePic: currentUser.photo,
            })
            .then((response) => {
                console.log(response.data);
                setComments([...comments, response.data]);
                setNewComment("");
            });
    };

    const handleUpdateBlog = () => {
        navigate(`/update-blog/${blog._id}`);
    };

    if (!blog) return <LoadingPage></LoadingPage>;

    const formattedDate = format(new Date(blog?.date), "MMMM dd, yyyy");

    return (
        <motion.div
            className="w-[90%] lg:w-[70%] mx-auto my-10 sm:my-14 md:my-16 lg:my-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
        >
            <h1 className="text-2xl sm:text-3xl xl:text-4xl text-blue-500 font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center">
                <div>
                    <p className="text-base sm:text-lg xl:text-xl text-gray-700 font-semibold">{blog.name}</p>
                    <p className="text-sm text-gray-600">{formattedDate}</p>
                </div>
            </div>
            <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-[20rem] sm:h-[25rem] xl:h-[35rem] object-cover rounded-md my-8 sm:my-10"
            />
            <p className="text-sm sm:text-base xl:text-lg my-8 sm:my-10 text-gray-600">{blog.longDescription}</p>

            {currentUser.email === blog.email ? (
                <Link to={`/update-blog/${blog._id}`}
                    onClick={handleUpdateBlog}
                    className="btn border-none bg-gradient-to-r from-blue-400 to-[#3b82f6] hover:from-blue-600 hover:to-[#3b82f6] text-white mb-4"
                >
                    Update Blog
                </Link>
            ) : (
                <div>
                    <textarea
                        className="textarea textarea-bordered w-full resize-none my-4"
                        placeholder="Add your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleAddComment}
                        className="btn btn-sm border-none bg-gradient-to-r from-blue-400 to-[#3b82f6] hover:from-blue-600 hover:to-[#3b82f6] text-white"
                    >
                        Submit Comment
                    </button>
                </div>
            )}

            <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-gray-700 my-4 sm:my-6 xl:my-8">Comments ({comments.length})</h2>
            <div className="space-y-4">
                {comments.map((comment, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                        <img
                            src={comment.userProfilePic}
                            alt={comment.userName}
                            className="w-8 sm:w-10 xl:w-14 h-8 sm:h-10 xl:h-14 rounded-full"
                        />
                        <div>
                            <p className="text-sm sm:text-base xl:text-lg font-semibold text-gray-600">{comment.userName}</p>
                            <p className="text-sm sm:text-base xl:text-lg text-gray-600">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            {
                comments.length === 0 && <p className="text-xs sm:text-sm xl:text-base">Be the first to share your thoughts. No comments available yet.</p>
            }
        </motion.div>
    );
};

export default BlogDetails;