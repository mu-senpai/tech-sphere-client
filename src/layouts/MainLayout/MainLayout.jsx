import { Outlet } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Navbar from "../../pages/common/Navbar/Navbar";
import Footer from "../../pages/common/Footer/Footer";
import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../../pages/common/LoadingPage/LoadingPage";
import ScrollToTop from "../../pages/common/ScrollToTop/ScrollToTop";

const MainLayout = () => {

    const { scrollY } = useScroll();
    const [isHidden, setIsHidden] = useState(false);
    const { loading } = useContext(AuthContext);

    useMotionValueEvent(scrollY, "change", (y) => {
        if (y < 320) {
            setIsHidden(false);
        } else if (y > 350) {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }
    })

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <div>
            <motion.nav
            animate={isHidden ? "hidden" : "visible"}
            variants={
                {
                    hidden:
                    {
                        y: "-100%",
                    },
                    visible: {
                        y: "0%",
                    },
                }
            }
            className={`${window.scrollY > 325 ? 'sticky top-0 z-50' : ''}`}>
                <Navbar></Navbar> 
            </motion.nav>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
            <ScrollToTop></ScrollToTop>          
        </div>
    );
};

export default MainLayout;