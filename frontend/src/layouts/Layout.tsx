import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar-sidebar/NavBar"
import SideBar from "../components/navbar-sidebar/SideBar"

export default function Layout() {
  return (
    <>
        <NavBar />
        <div className="flex flex-row">
            <SideBar/>
            <main className="mt-10 max-w-6xl p-10 bg-white shadow">
                <Outlet />
            </main>
        </div>
    
    </>
  )
}
