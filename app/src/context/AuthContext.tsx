"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// Define la estructura de datos para el usuario
interface User {
  id: string;
  name: string;
  email: string;
  // Puedes agregar más propiedades según tu modelo de usuario
}

// Define la estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (userData: User, authToken: string) => void;
  logoutUser: () => void;
}

// Crea el contexto con un tipo genérico
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define las props para el proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginUser = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);

    // Solo se ejecutará en el cliente
    if (global?.window !== undefined) {
      window?.localStorage?.setItem("user", JSON.stringify(userData));
      window?.localStorage?.setItem("token", authToken);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);

    if (global?.window !== undefined) {
      // Solo se ejecutará en el cliente
      window?.localStorage?.clear();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
