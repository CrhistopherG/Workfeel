import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <header className="bg-gray-300 shadow-black lg max-h-17 shadow flex justify-between">
        {/* */}
        <div className="mx-4 max-w-6xl py-2 flex  text-start  items-center">
        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>
            <Link to="/periodo">
                <img className=" lg:w-xs md:w-2xs w-40" src="/workfeel-logo.png" alt="Workfeel Logo"/>
            </Link>
            
        </div>
        <div className="mx-4 max-w-6xl py-2 flex justify-between text-end  items-center">
            <IoIosNotifications className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8 mx-1"/>
            <FaRegUserCircle className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8 mx-1" />

            <h1 className="lg:text-lg md:text-sm text-xs text-black mx-1 text-nowrap">
                 Bienvenido Crhistopher Gutierrez   
            </h1>
        </div>
    </header>
  )
}
