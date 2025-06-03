import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../components/navbar-sidebar/NavBar"
import SideBar from "../components/navbar-sidebar/SideBar"

export default function Layout() {
  const location = useLocation()

  // Cambia esta ruta base según tu routing
  const isRoot = location.pathname === "/"

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <div>
          <SideBar />
        </div>
        <div className="justify-center ms-60 mt-10 w-full">
          <main className="mt-10 mx-5 p-5 bg-white shadow-lg justify-items-center">
            {isRoot ? (
              <div className="text-center text-4xl text-gray-600">
                👋 Bienvenido a Workfeel. Selecciona una opción del menú lateral.
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </>
  )
}
