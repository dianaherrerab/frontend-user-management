import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await login(email, password);
        navigate("/users"); // Redirige a la lista de usuarios después de autenticarse
        } catch (error) {
        alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
            <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 my-2 border"
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 my-2 border"
            />
            <button type="submit" className="w-full p-2 mt-2 bg-blue-500 text-white rounded">
            Iniciar Sesión
            </button>
        </form>
        </div>
    );
}

export default Login;
