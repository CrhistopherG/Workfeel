import NavBar from "../navbar-sidebar/NavBar";
import SideBar from "../navbar-sidebar/SideBar";


export default function Periodo() {
  return (
    <>
        <NavBar />
        <div className="flex flex-row">
            <div>
              <SideBar/>
            </div>
            <div className="justify-center w-full">
            <main className="mt-10 mx-5 p-10 bg-white shadow-lg justify-items-center">
                  Soy el componente de periodo
              </main>
            </div>
        </div>
    
    
    </>
  )
}
