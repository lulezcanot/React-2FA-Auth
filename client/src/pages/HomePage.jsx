import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../service/authApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogout = async() => {
    try {
      const {data} = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-m mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Bienvenido, {user.username}!</h2>
      <p>Ha iniciado sesión correctamente y ha verificado su 2FA</p>
      <button
        type="button"
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default HomePage;
