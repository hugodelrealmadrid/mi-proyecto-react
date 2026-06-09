import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {

      if (u) {
        setUser(u);

        const docRef = doc(db, "users", u.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRol(docSnap.data().rol);
        }
      } else {
        setUser(null);
        setRol(null);
      }

    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, rol }}>
      {children}
    </AuthContext.Provider>
  );
}
