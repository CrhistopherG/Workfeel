import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
//importamos nuestros subcomponentes en nuestro panel administrativo
import CompanyList from "../../views/CompanyList"
interface NavBarProps {
    toggleSidebar: () => void; // toggleSidebar es una función que no retorna nada
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
    const [auth] = useState("Administrativo");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú desplegable

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gray-800 text-white shadow-md sticky top-0 w-full z-50">
            <div className="flex justify-between items-center px-4 py-2">
                {/* Botón de menú y logo */}
                <div className="flex items-center space-x-4">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        <GiHamburgerMenu size={24} />
                    </button>
                    <Link to="/periodo">
                        <img
                            className="h-10"
                            src="/workfeel-logo.png"
                            alt="Workfeel Logo"
                        />
                    </Link>
                </div>

                {/* Ícono de notificación y menú de usuario */}
                <div className="flex items-center space-x-4">
                    {/* Notificaciones */}
                    <button
                        type="button"
                        className="relative text-white hover:text-gray-300 focus:outline-none"
                        aria-label="Notificaciones"
                    >
                        <IoIosNotifications size={24} />
                        <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* Menú desplegable de usuario */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Opciones de usuario"
                        >
                            <FaRegUserCircle size={28} />
                        </button>
                        {isMenuOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-20">
                                <li>
                                    <Link
                                        to="/Ajustes"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                                    >
                                        Ajustes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/perfil"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                                    >
                                        Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/consumo"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                                    >
                                        Consumo
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/logout"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                                    >
                                        Cerrar Sesión
                                    </Link>
                                </li>
                                {auth === "Administrativo" && (
                                    <li>
                                        <Link
                                            to="/Panel_Administrativo"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
                                        >
                                            Panel Administrativo
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Nombre del usuario */}
                    <span className="text-sm">Crhistopher Gutierrez</span>
                </div>
            </div>
        </header>
    );
};

export default NavBar;