import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar-sidebar/NavBar"
import SideBar from "../components/navbar-sidebar/SideBar"

export default function Layout() {
  return (
    <>
        <NavBar />
        <SideBar />
        <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
            <Outlet />
        </main>
    
    </>
  )
}
