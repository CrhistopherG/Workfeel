// src/components/NavBar.tsx
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

  return (
    <header className="bg-gray-300 shadow-black lg max-h-17 shadow flex justify-between">
      {/* Logo */}
      <div className="mx-4 max-w-6xl py-2 flex text-start items-center">
        <Link to="/periodo">
          <img
            className="lg:w-xs md:w-2xs w-40"
            src="/workfeel-logo.png"
            alt="Workfeel Logo"
          />
        </Link>
      </div>

      {/* Notificaciones y Menú de Usuario */}
      <div className="mx-4 max-w-6xl py-2 flex justify-between text-end items-center">
        <IoIosNotifications className="lg:w-8 lg:h-8 md:w-6 md:h-6 w-4 h-8 mx-1" />

        {/* Menú desplegable */}
        <div className="relative">
          <button
            className="bg-white text-gray-800 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="Opciones de usuario"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Alterna el estado del menú
          >
            <FaRegUserCircle className="text-2xl" />
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <li>
                <Link
                  to="/Ajustes"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ajustes
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/consumo"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Consumo
                </Link>
              </li>
              <li>
                <Link
                  to="/paneladministrador"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Panel Administrador
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Nombre del Usuario y Botón de Cerrar Sesión */}
        <div className="flex items-center">
          <h1 className="uppercase lg:text-md md:text-sm text-xs text-black mx-1 text-nowrap">
            {user?.name || "Invitado"}
          </h1>
          {user && (
            <button
              onClick={logout}
              className="ml-2 text-sm flex flex-row items-center text-black hover:text-blue-800"
            >
              <RiLogoutBoxLine className="me-1 text-2xl" />
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}