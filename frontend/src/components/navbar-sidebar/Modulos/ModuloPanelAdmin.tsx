import { Link } from "react-router-dom"

export default function ModuloPanelAdmin() {
  return (
    <>
    <div className="w-full space-x-10 space-y-20">
        <div className="flex flex-row text-center">
            <div className=" flex space-y-20 flex-col justify-between px-17 w-full">
                <h2 className="text-5xl font-black text-slate 500">Ver todos las empresas</h2>
                <Link 
                    to="/panel_administrativo/empresas/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
                >
                    Agregar nueva empresa
                </Link>
            </div>
            <div className=" flex space-y-20 flex-col justify-between px-17 w-full">
                <h2 className="text-5xl font-black text-slate 500">Registrar nuevo usuario</h2>
                <Link 
                    to="/panel_administrativo/usuarios/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
                >
                    Agregar nuevo usuario
                </Link>
            </div>

        </div>
        <div className="flex flex-row text-center">
            <div className="flex space-y-20 flex-col justify-between mx-20 w-full">
                <h2 className="text-5xl font-black text-slate 500">Ver todos los usuarios</h2>
                <Link 
                    to="/panel_administrativo/usuarios/ver_todos"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
                >
                    Ver usuarios
                </Link>
            </div>
            <div className="flex space-y-20 flex-col justify-between mx-20 w-full">
                <h2 className="text-5xl font-black text-slate 500">Registrar nueva empresa</h2>
                <Link 
                    to="/panel_administrativo/empresas/ver_todos"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadows-sm hover:bg-indigo-500"
                >
                    Ver empresas
                </Link>
            </div>

        </div>
    </div>
    </>
  )
}
