import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { FaRocket, FaTrophy, FaUsers } from "react-icons/fa";

const OurStory = () => {
    const timelineData = [
        {
          date: "2024",
          title: "The Birth of TechSphere",
          description: "TechSphere started in early 2024 with a simple mission: to provide a space where IT enthusiasts could share and explore valuable insights.",
          icon: <FaRocket />,
          iconBg: "#ef4444", 
        },
        {
          date: "2024",
          title: "First 50 Blogs Published",
          description: "In just a few months, TechSphere achieved its first milestone of publishing 50 blogs, contributed by passionate tech enthusiasts.",
          icon: <FaTrophy />,
          iconBg: "#f59e0b",
        },
        {
          date: "2024",
          title: "A Budding Community",
          description: "By the end of 2024, TechSphere's community grew modestly to around 200 registered users, creating a foundation for future growth.",
          icon: <FaUsers />,
          iconBg: "#3b82f6",
        },
      ];
      

    return (
        <section className="w-[90%] lg:w-[85%] mx-auto py-10">

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-blue-500 mb-4 lg:mb-6">Our Journey</h2>
                <p className="text-sm sm:text-base lg:text-lg text-center mb-6 lg:mb-8">
                    Explore the milestones that shaped TechSphere into a leading platform for IT bloggers and readers.
                </p>
            </motion.div>

            <VerticalTimeline lineColor="#3b82f6">
                {timelineData.map((event, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        date={event.date}
                        contentStyle={{ background: "var(--tw-bg-opacity) bg-base-100", border: "2px solid #d2d2d3" }} // White background and Tailwind gray-800 text
                        contentArrowStyle={{ borderRight: "7px solid #d2d2d3" }}
                        iconStyle={{ background: event.iconBg, color: "#ffffff" }}
                        icon={event.icon}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="vertical-timeline-element-title text-lg font-bold">
                                {event.title}
                            </h3>
                            <p className="mt-2">{event.description}</p>
                        </motion.div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </section>
    );
};

export default OurStory;
