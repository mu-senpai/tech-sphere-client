import { useState, useEffect, useMemo, useContext } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import axios from "axios";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import lottieData from "../../assets/featured.json";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../common/LoadingPage/LoadingPage";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { dataLoading, setDataLoading } = useContext(AuthContext);

    useEffect(() => {
        setDataLoading(true);
        axios
            .get("https://tech-sphere-server.vercel.app/featured-blogs")
            .then((response) => setBlogs(response.data))
            .catch((error) => toast.error("Error fetching blogs:", error));
        setDataLoading(false);
    }, []);

    const processedData = useMemo(
        () =>
            blogs.map((blog) => ({
                ...blog,
                wordCount: blog.longDescription
                    ? blog.longDescription.reduce(
                        (total, paragraph) => total + paragraph.trim().split(/\s+/).length,
                        0
                    )
                    : 0,
            })),
        [blogs]
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: "title",
                header: "Title",
            },
            {
                accessorKey: "category",
                header: "Category",
            },
            {
                accessorKey: "wordCount",
                header: "Word Count",
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "date",
                header: "Publish Date",
                cell: (info) =>
                    new Date(info.getValue()).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    }),
            },
        ],
        []
    );

    const table = useReactTable({
        data: processedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (dataLoading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <section
            className="w-[90%] lg:w-[85%] min-h-screen 2xl:min-h-[60rem] mx-auto my-10 sm:my-12 md:my-16 lg:my-20"
        >
            <div
                className="flex flex-col lg:flex-row items-center justify-between my-10 sm:my-12 md:my-16 lg:my-20"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left flex-grow">
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-500 mb-4">
                        Featured Blogs
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg">
                        Explore our top 10 blogs based on word count with insightful content, curated for your learning journey.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:block w-[20rem] xl:w-[25rem]">
                    <Lottie animationData={lottieData} loop={true} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="overflow-x-auto">
                <table className="table md:table-lg border w-[55rem] sm:w-full">

                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer text-blue-500 text-base md:text-lg"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <motion.tr
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 ,duration: 0.6, ease: "easeOut" }}
                                className="hover:bg-blue-500/15" key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </section>
    );
};

export default FeaturedBlogs;
