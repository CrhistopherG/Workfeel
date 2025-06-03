import { useState } from "react";
import {
  RiSettingsLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import ModuloPeriodo from "./Modulos/ModuloPeriodo";
import ModuloEncuestas from "./Modulos/ModuloEncuestas";
import ModuloResultados from "./Modulos/ModuloResultados";
import ModuloGenerales from "./Modulos/ModuloGenerales";

export default function SideBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <aside
      id="sidebar"
      className="top-17 left-0 z-40 w-64 h-full fixed transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <h1 className="p-1 pb-2 text-gray-900 rounded-lg text-2xl dark:text-white uppercase">
          Módulos
        </h1>
        <ul className="space-y-2 font-medium">
          {/* Primer elemento simple (Periodo) */}
          <ModuloPeriodo />

          {/* Dropdown 1: Encuestas */}
          <li>
            <button
              type="button"
              onClick={() => toggleDropdown("encuestas")}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-expanded={openDropdown === "encuestas"}
            >
              <RiQuestionAnswerLine className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 text-left whitespace-nowrap">
                Encuestas
              </span>
              {openDropdown === "encuestas" ? (
                <RiArrowDownSLine className="w-4 h-4" />
              ) : (
                <RiArrowRightSLine className="w-4 h-4" />
              )}
            </button>
            <ul
              className={`py-2 space-y-2 ${
                openDropdown === "encuestas" ? "block" : "hidden"
              }`}
            >
              <ModuloEncuestas />
            </ul>
          </li>

          {/* Dropdown 2: Resultados */}
          <li>
            <button
              type="button"
              onClick={() => toggleDropdown("resultados")}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-expanded={openDropdown === "resultados"}
            >
              <ImStatsDots className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 text-left whitespace-nowrap">
                Resultados
              </span>
              {openDropdown === "resultados" ? (
                <RiArrowDownSLine className="w-4 h-4" />
              ) : (
                <RiArrowRightSLine className="w-4 h-4" />
              )}
            </button>
            <ul
              className={`py-2 space-y-2 ${
                openDropdown === "resultados" ? "block" : "hidden"
              }`}
            >
               <ModuloResultados />
            </ul>
          </li>

          {/* Dropdown 3: Configuración */}
          <li>
            <button
              type="button"
              onClick={() => toggleDropdown("generales")}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-expanded={openDropdown === "generales"}
            >
              <RiSettingsLine className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 text-left whitespace-nowrap">
                Generales
              </span>
              {openDropdown === "generales" ? (
                <RiArrowDownSLine className="w-4 h-4" />
              ) : (
                <RiArrowRightSLine className="w-4 h-4" />
              )}
            </button>
            <ul
              className={`py-2 space-y-2 ${
                openDropdown === "generales" ? "block" : "hidden"
              }`}
            >
               <ModuloGenerales />
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}
