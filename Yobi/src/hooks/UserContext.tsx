import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useAuth } from "@clerk/clerk-expo";

interface UserContextType {
  userData: any; // Substitua por uma interface mais específica se souber os dados esperados
  workerData: any; // Substitua por uma interface mais específica
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [workerData, setWorkerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      // Buscar dados do usuário
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      // Buscar dados do trabalhador
      const workerDocRef = doc(db, "workers", userId);
      const workerDocSnap = await getDoc(workerDocRef);

      setUserData(userDocSnap.data() || null);
      setWorkerData(workerDocSnap.data() || null);
    } catch (err) {
      console.error("Erro ao buscar dados do Firebase:", err);
      setError("Erro ao carregar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userData, workerData, isLoading, error, refetch: fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
