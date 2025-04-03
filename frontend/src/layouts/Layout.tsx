import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar-sidebar/NavBar"
import SideBar from "../components/navbar-sidebar/SideBar"

export default function Layout() {
  return (
    <>
        <NavBar />
        <div className="flex flex-row">
            <div>
              <SideBar/>
            </div>
            <div className="justify-center w-full">
              <main className="mt-10 mx-5 p-10 bg-white shadow-lg justify-items-center">
                  <Outlet />
              </main>
            </div>
        </div>
    
    </>
  )
}
