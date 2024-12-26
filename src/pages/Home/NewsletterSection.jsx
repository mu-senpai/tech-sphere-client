import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[90%] lg:w-[85%] mx-auto my-10 sm:my-12 md:my-16 lg:my-20 xl:my-24 bg-gradient-to-r from-blue-500 to-blue-800 text-white p-8 rounded-lg text-center"
    >
      <div className="container mx-auto max-w-xl">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-12 h-12 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8"
              />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
          >
            Subscribe to newsletter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg mb-6"
          >
            Stay up to date! Get all the latest posts delivered straight to your
            inbox.
          </motion.p>
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 w-full"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="input input-sm sm:input-md input-bordered text-black w-full md:w-[80%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="font-bold btn btn-sm sm:btn-md border-none bg-gradient-to-r from-blue-400 to-[#3b82f6] hover:from-blue-600 hover:to-[#3b82f6] text-white w-full md:w-auto"
              type="submit"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
