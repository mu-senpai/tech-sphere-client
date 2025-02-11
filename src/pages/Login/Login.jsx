import { FcGoogle } from "react-icons/fc";
import loginLottieData from "../../assets/login.json";
import Lottie from "lottie-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {

    const { logInUser, loginWithGoogle} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleLogin = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData.entries());

        const { email, password } = data;

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            alert(
                "Password must have at least one uppercase letter, one special character, and be at least 6 characters long."
            );
            return;
        }

        logInUser(email, password)
            .then(() => {
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error(error.code);
            })
    };

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then(result => {
                const name = result.user?.displayName;
                const photo = result.user?.photoURL;
                const email = result.user?.email;
                const createdAt = result.user?.metadata?.creationTime;
                const uid = result.user?.uid;
                const newUser = { name, email, photo, createdAt, uid };

                axiosSecure.put('/users', newUser)
                    .then(data => {
                        if (data.data.matchedCount > 0 || data.data.modifiedCount > 0 || data.data.upsertedCount > 0) {
                            navigate(location?.state ? location.state : '/');
                        }
                    })
                    .catch(error => {
                        toast.error(error.code);
                    })
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    return (
        <div className="min-h-screen 2xl:min-h-[60rem] flex flex-col-reverse lg:flex-row items-center justify-center gap-8 sm:gap-0 sm:justify-between py-10 sm:py-16 lg:py-20 2xl:py-28">

            <div className="hidden xl:flex xl:w-[25%]"></div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: easeInOut }}
                className="card w-full lg:w-[45&] xl:w-[40%] p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">Member <span className="text-blue-500">Login</span></h2>
                <p className="text-sm text-center mb-4">Access to all features. No credit card required.</p>

                {/* Google Signup */}
                <button onClick={handleLoginWithGoogle} className="btn btn-ghost border-2 border-[#05264e] hover:bg-[#05264e] hover:text-white w-full mb-4 flex items-center justify-center">
                    <FcGoogle className="text-2xl mr-2" /> Sign up with Google
                </button>

                <div className="flex items-center justify-center mb-4">
                    <hr className="flex-grow border-slate-300" />
                    <span className="mx-2">Or continue with</span>
                    <hr className="flex-grow border-slate-300" />
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin}>

                    <div className="form-control mb-4">
                        <label className="label">Email</label>
                        <input type="email" placeholder="stevenjob@gmail.com" name="email" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Password</label>
                        <input type="password" placeholder="********" name="password" className="input input-bordered w-full" required />
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-[#05264e] hover:bg-blue-500 border-none text-white w-full">Submit & Register</button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <Link to={`/register`} className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </motion.div>
            
            <div className="hidden lg:w-[55%] xl:w-[25%] lg:flex flex-col items-center justify-center">
                <Lottie animationData={loginLottieData} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default Login;