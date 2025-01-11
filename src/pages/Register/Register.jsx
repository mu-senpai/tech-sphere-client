import { FcGoogle } from "react-icons/fc";
import registerLottieData from "../../assets/register.json";
import Lottie from "lottie-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {

    const { createUser, loginWithGoogle, setNamePhotoToUserProfile, setLoading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData.entries());

        const { name, email, password, photo, terms } = data;

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error("Password must have at least one uppercase letter, one special character, and be at least 6 characters long.");
            return;
        }

        if (!terms) {
            toast.error("You must agree to the terms and policy.")
            return;
        }

        createUser(email, password)
            .then((result) => {
                setUser(result.user);

                const createdAt = result.user?.metadata?.creationTime;
                const uid = result.user?.uid;
                const newUser = { name, email, photo, createdAt, uid };

                axiosSecure.post('/users', newUser)
                    .then(data => {

                        if (data.data.insertedId) {
                            setNamePhotoToUserProfile(name, photo)
                                .then(() => {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You have successfully registered!',
                                        icon: 'success',
                                        confirmButtonText: 'Close'
                                    }).then(() => {
                                        navigate('/');
                                    });
                                })
                                .catch((error) => {
                                    setLoading(false);
                                    toast.error(error.code);
                                });
                        }

                        formData.reset();
                    })
                    .catch(error => {
                        setLoading(false);
                        toast.error(error.code);
                    })
            })
            .catch(error => {
                setLoading(false);
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
                        setLoading(false);
                        toast.error(error.code);
                    })
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.code);
            })
    }

    return (
        <div className="min-h-screen 2xl:min-h-[60rem] flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-0 justify-center sm:justify-between py-10 sm:py-16 lg:py-20 2xl:py-28">

            <div className="hidden xl:flex xl:w-[25%]"></div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: easeInOut }}
                className="card w-full lg:w-[45&] xl:w-[40%] bg-white p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">Start for free <span className="text-blue-500">Today</span></h2>
                <p className="text-gray-500 text-sm text-center mb-4">Access to all features. No credit card required.</p>

                {/* Google Signup */}
                <button onClick={handleLoginWithGoogle} className="btn btn-ghost border-2 border-[#05264e] hover:bg-[#05264e] hover:text-white w-full mb-4 flex items-center justify-center">
                    <FcGoogle className="text-2xl mr-2" /> Sign up with Google
                </button>

                <div className="flex items-center justify-center mb-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="text-gray-500 mx-2">Or continue with</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Form Fields */}
                <form onSubmit={handleRegister}>
                    <div className="form-control mb-4">
                        <label className="label text-gray-700">Full Name</label>
                        <input type="text" placeholder="Steven Job" name="name" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label text-gray-700">Photo URL</label>
                        <input type="url" placeholder="https://.........." name="photo" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label text-gray-700">Email</label>
                        <input type="email" placeholder="stevenjob@gmail.com" name="email" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label text-gray-700">Password</label>
                        <input type="password" placeholder="********" name="password" className="input input-bordered w-full" required />
                    </div>

                    {/* Checkbox */}
                    <div className="form-control mb-6">
                        <label className="label flex items-center justify-start gap-2">
                            <input type="checkbox" className="checkbox checkbox-sm" name="terms" />
                            <p className="label-text">Agree to our terms and policy</p>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-[#05264e] hover:bg-blue-500 border-none text-white w-full">Submit & Register</button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to={`/login`} className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
            <div className="hidden lg:flex lg:w-[55%] xl:w-[25%] flex-col items-center justify-center">
                <Lottie animationData={registerLottieData} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default Register;