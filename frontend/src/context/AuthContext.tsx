import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  user_id: number;
  name: string;
  email: string;
  rol_id: number;
  company_id: number;
  token?: string; // Hacer opcional para casos donde no esté presente
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Verificación opcional con el backend
        if (parsedUser.token) {
          axios.get(`${import.meta.env.VITE_API_URL}/api/validate-token`, {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`
            }
          }).catch(() => {
            // Si falla la validación, limpiamos el usuario
            localStorage.removeItem('user');
            setUser(null);
          });
        }
      } catch (e) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password
      });      

      if (response.data.success) {
        const userData = {
          user_id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          rol_id: response.data.user.rol_id,
          company_id: response.data.user.company_id,
          ...(response.data.token && { token: response.data.token }) // Token opcional
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err) {
      setError('Credenciales incorrectas o error de conexión');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}