import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el envío por defecto del formulario
    console.log("Formulario enviado");
    navigate("/usuarios");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md text-center">
        <h3 className="font-bold text-xl mb-1">Bienvenido a</h3>
        <h1 className="text-gray-500 font-bold text-3xl tracking-widest mb-6">
          Workfeel
        </h1>

        <form onSubmit={handleSubmit}>
          <h4 className="font-semibold mb-2">Username</h4>
          <div className="flex items-center w-3/4 mx-auto bg-gray-100 rounded-full p-2 mb-4">
            <FaRegUserCircle className="text-gray-500 ml-3" />
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu nombre"
              className="flex-1 bg-transparent outline-none text-center font-bold px-3"
              required
            />
          </div>

          <h4 className="font-semibold mb-2">Password</h4>
          <div className="flex items-center w-3/4 mx-auto bg-gray-100 rounded-full p-2 mb-4">
            <RiLockPasswordFill className="text-gray-500 ml-3" />
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="flex-1 bg-transparent outline-none text-center font-bold px-3"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="text-red-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;