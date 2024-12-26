import { useState } from "react";
import { motion } from "framer-motion";

const Testimonials = [
    {
        name: "John Doe",
        role: "Full-Stack Developer at CodeHub",
        message:
            "TechSphere provides invaluable insights into the latest technologies and trends. It's my go-to platform for staying updated in the IT world!",
        img: "https://i.ibb.co.com/S7Hg1J6/male-1.jpg",
    },
    {
        name: "Jane Smith",
        role: "Data Scientist at AI Labs",
        message:
            "The articles on TechSphere are well-researched and incredibly insightful. I’ve learned so much about AI and machine learning here.",
        img: "https://i.ibb.co.com/C6JF033/female-1.jpg",
    },
    {
        name: "Mike Johnson",
        role: "Cloud Engineer at CloudTech",
        message:
            "TechSphere helped me get started with Kubernetes and cloud architecture. A must-read for anyone in tech!",
        img: "https://i.ibb.co.com/GvmYg5g/male-2.jpg",
    },
    {
        name: "Emily Davis",
        role: "UI/UX Designer at CreativeEdge",
        message:
            "TechSphere's design blogs have revolutionized the way I approach user interfaces. The tips and tools shared are top-notch!",
        img: "https://i.ibb.co.com/S3kgHz7/female-2.jpg",
    },
    {
        name: "Chris Lee",
        role: "Cybersecurity Analyst at SecureNet",
        message:
            "I love the cybersecurity section on TechSphere. It keeps me informed about the latest vulnerabilities and protection methods.",
        img: "https://i.ibb.co.com/2gvS0z5/male-3.jpg",
    },
    {
        name: "Sophia Brown",
        role: "DevOps Engineer at BuildOps",
        message:
            "TechSphere has been instrumental in improving my CI/CD pipelines. The tutorials and articles are very practical.",
        img: "https://i.ibb.co.com/c3HLpRs/female-3.jpg",
    },
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === Testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full mx-auto max-w-4xl p-8">
            
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-blue-500 mb-4 lg:mb-6">
                    Testimonials
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-center text-gray-600 mb-6 lg:mb-8">
                    What our readers say about TechSphere
                </p>
            </motion.div>

            <div className="relative">
                <div className="overflow-hidden">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center items-center"
                    >
                        <div className="flex flex-col h-80 items-center justify-center text-center bg-white p-6">
                            <img
                                src={Testimonials[currentIndex].img}
                                alt={Testimonials[currentIndex].name}
                                className="w-16 h-16 object-cover rounded-full mb-4"
                            />
                            <p className="text-gray-700 italic mb-4">
                                "{Testimonials[currentIndex].message}"
                            </p>
                            <h3 className="font-bold text-lg text-blue-500">
                                {Testimonials[currentIndex].name}
                            </h3>
                            <p className="text-gray-500">{Testimonials[currentIndex].role}</p>
                        </div>
                    </motion.div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg"
                >
                    &#8249;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute -right-5  top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg"
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
}
