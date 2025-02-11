import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import heroLottie from "../../assets/hero-animation.json"; 

const HeroSection = () => {
  return (
    <div className="w-[85%] mx-auto flex flex-col lg:flex-row items-center justify-between mt-5 sm:mt-0 md:mt-8 sm:my-8 md:my-0 lg:my-10 2xl:my-12">
      {/* Left Side Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[55%]"
      >
        <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl text-left font-bold mb-4 sm:mb-6">
          Welcome to <span className="text-blue-500 font-audiowide">TechSphere</span>
        </h1>
        <p className="text-sm/normal sm:text-base/normal xl:text-lg/normal 2xl:text-xl/normal text-left mb-6">
          Discover the latest trends, tips, and tools in information technology. Your ultimate guide to staying ahead in the tech world.
        </p>
        {/* Static Useful Content */}
        <div className="mt-6 text-left text-xs/normal xl:text-sm/normal 2xl:text-base/normal space-y-2">
          <p>✔ Stay informed about the latest advancements in IT.</p>
          <p>✔ Learn from expert tips and tutorials tailored for you.</p>
          <p>✔ Explore cutting-edge tools and software solutions.</p>
        </div>
      </motion.div>

      {/* Right Side Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end mt-10 lg:mt-0"
      >
        <Lottie
          loop
          animationData={heroLottie}
          play
          className="w-full sm:w-[28rem] lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
