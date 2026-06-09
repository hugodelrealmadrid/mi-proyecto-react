import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase/config";

const db = getFirestore(app);

export const createUser = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    nombre: user.displayName || "",
    email: user.email,
    rol: "user",
    fotoPerfil: user.photoURL || "",
  });
};