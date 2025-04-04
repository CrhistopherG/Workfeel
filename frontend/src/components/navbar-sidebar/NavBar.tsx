// src/components/NavBar.tsx
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-300 shadow-black lg max-h-17 shadow flex justify-between">
      <div className="mx-4 max-w-6xl py-2 flex text-start items-center">
        <Link to="/dashboard">
          <img className="lg:w-xs md:w-2xs w-40" src="/workfeel-logo.png" alt="Workfeel Logo"/>
        </Link>
      </div>
      
      <div className="mx-4 max-w-6xl py-2 flex justify-between text-end items-center">
        <IoIosNotifications className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8 mx-1"/>
        <FaRegUserCircle className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8 mx-1" />
        
        <div className="flex items-center">
          <h1 className="lg:text-lg md:text-sm text-xs text-black mx-1 text-nowrap">
            Bienvenido {user?.name || 'Invitado'}
          </h1>
          {user && (
            <button 
              onClick={logout}
              className="ml-2 text-sm flex flex-row items-center text-black hover:text-blue-800"
            >
              <RiLogoutBoxLine className="me-1 text-2xl"/>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}