import { useState } from "react";
import { register, login, loginWithGoogle } from "../services/auth";
import { createUser } from "../services/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
const handleRegister = async () => {
  try {
    const userCredential = await register(email, password);

    // 🔥 GUARDAR EN FIRESTORE
    await createUser(userCredential.user);

    console.log("Registrado:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
};



  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      console.log("Logeado:", userCredential.user);
    } catch (error) {
      console.error(error.message);
    }
  };

const handleGoogle = async () => {
  try {
    const result = await loginWithGoogle();

    // 🔥 GUARDAR EN FIRESTORE
    await createUser(result.user);

    console.log("Google login:", result.user);
  } catch (error) {
    console.error(error.message);
  }
};

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border px-3 py-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="border px-3 py-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">
        Registrarse
      </button>

      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">
        Iniciar sesión
      </button>

      <button onClick={handleGoogle} className="bg-red-500 text-white px-4 py-2">
        Google
      </button>
    </div>
  );
}

export default Login;