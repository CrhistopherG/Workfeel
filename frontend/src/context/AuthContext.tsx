import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  user_id: number;
  name: string;
  email: string;
  rol_id: number;
  company_id: number;
  token?: string;
}

interface Department {
  department_id: number;
  name: string;
  description?: string | null;
  company_id: number;
}

interface AuthContextType {
  user: User | null;
  departments: Department[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchDepartments: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar departamentos de la API según company_id del usuario
  const fetchDepartments = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/companies/${user.company_id}/departments`,
        {
          headers: {
            Authorization: `Bearer ${user.token || ''}`
          }
        }
      );
      const depts: Department[] = response.data;
      setDepartments(depts);
      localStorage.setItem('departments', JSON.stringify(depts));
    } catch (error) {
      console.error("Error cargando departamentos", error);
    }
  };

  // Verificar autenticación y cargar datos al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedDepartments = localStorage.getItem('departments');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (storedDepartments) {
          setDepartments(JSON.parse(storedDepartments));
        } else {
          fetchDepartments();
        }

        // Validar token con backend (opcional)
        if (parsedUser.token) {
          axios
            .get(`${import.meta.env.VITE_API_URL}/api/validate-token`, {
              headers: { Authorization: `Bearer ${parsedUser.token}` }
            })
            .catch(() => {
              localStorage.removeItem('user');
              localStorage.removeItem('departments');
              setUser(null);
              setDepartments([]);
            });
        }
      } catch (e) {
        console.log(e);
        localStorage.removeItem('user');
        localStorage.removeItem('departments');
        setUser(null);
        setDepartments([]);
      }
    }
    setLoading(false);
  }, []);

  // Función para login
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password
      });

      if (response.data.success) {
        const userData: User = {
          user_id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          rol_id: response.data.user.rol_id,
          company_id: response.data.user.company_id,
          ...(response.data.token && { token: response.data.token })
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        await fetchDepartments(); // Cargar departamentos al hacer login

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      setError('Credenciales incorrectas o error de conexión');
      return false;
    }
  };

  // Función logout
  const logout = () => {
    setUser(null);
    setDepartments([]);
    localStorage.removeItem('user');
    localStorage.removeItem('departments');
  };

  const value = {
    user,
    departments,
    login,
    logout,
    fetchDepartments,
    isAuthenticated: !!user,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
