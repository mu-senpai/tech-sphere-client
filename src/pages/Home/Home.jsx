import HeroSection from "./HeroSection";
import NewsletterSection from "./NewsletterSection";
import OurStory from "./OurStory";
import RecentBlogs from "./RecentBlogs";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div className="w-full">
            <HeroSection></HeroSection>
            <OurStory></OurStory>
            <RecentBlogs></RecentBlogs>
            <Testimonials></Testimonials>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;