import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <header className="bg-gray-300 shadow-black lg max-h-17 shadow flex justify-between">
        {/* */}
        <div className="mx-4 max-w-6xl py-2 flex  text-start  items-center">
            <button className="ms-2" aria-label="Toggle Sidebar">
                <GiHamburgerMenu className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8"/>
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
