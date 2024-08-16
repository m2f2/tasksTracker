import clsx from "clsx";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
            MdDashboard,
            MdOutlineAddTask,
            MdOutlinePendingActions,
            MdSettings,
            MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

// Array defining sidebar links and their associated icons
const linkData = [
            {
                        label: "Dashboard",
                        link: "dashboard",
                        icon: <MdDashboard />,
            },
            {
                        label: "Tasks",
                        link: "tasks",
                        icon: <FaTasks />,
            },
            {
                        label: "Completed",
                        link: "completed/completed",
                        icon: <MdTaskAlt />,
            },
            {
                        label: "In Progress",
                        link: "in-progress/in progress",
                        icon: <MdOutlinePendingActions />,
            },
            {
                        label: "To Do",
                        link: "todo/todo",
                        icon: <MdOutlinePendingActions />,
            },
            {
                        label: "Team",
                        link: "team",
                        icon: <FaUsers />,
            },
            {
                        label: "Trash",
                        link: "trashed",
                        icon: <FaTrashAlt />,
            },
];

const Sidebar = () => {
            // Access user data from the Redux store
            const { user } = useSelector((state) => state.auth);

            const dispatch = useDispatch();
            const location = useLocation();

            // Get the current path from the location object
            const path = location.pathname.split("/")[1];

            // Determine which sidebar links to display based on user role
            const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

            // Function to close the sidebar
            const closeSidebar = () => {
                        dispatch(setOpenSidebar(false));
            };
 
            // Component to render individual navigation links
            const NavLink = ({ el }) => {
                        return (
                                    <Link
                                                to={el.link}
                                                onClick={closeSidebar}
                                                className={clsx(
                                                            "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
                                                            path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
                                                )}
                                    >
                                                {el.icon}
                                                <span className='hover:text-[#2564ed]'>{el.label}</span>
                                    </Link>
                        );
            };

            return (
                        <div className='w-full h-full flex flex-col gap-6 p-5'>
                                    <h1 className='flex gap-1 items-center'>
                                                <p className='bg-blue-600 p-2 rounded-full'>
                                                            <MdOutlineAddTask className='text-white text-2xl font-black' />
                                                </p>
                                                <span className='text-2xl font-bold text-black'>My Tasks</span>
                                    </h1>

                                    <div className='flex-1 flex flex-col gap-y-5 py-8'>
                                                {/* Map through sidebarLinks to render each navigation link */}
                                                {sidebarLinks.map((link) => (
                                                            <NavLink el={link} key={link.label} />
                                                ))}
                                    </div>

                                    <div>
                                                <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
                                                            <MdSettings />
                                                            <span>Settings</span>
                                                </button>
                                    </div>
                        </div>
            );
};

export default Sidebar;