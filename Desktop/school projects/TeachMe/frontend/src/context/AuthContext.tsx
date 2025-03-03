
import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return (
    <div className="flex-col  h-150 gap-4 w-full flex items-center justify-center">
      <div className="w-15 h-15 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
    </div>
  ); 

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
