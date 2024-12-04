import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Definir o tipo para o contexto
type AuthContextType = {
  nickname: string | null;
  login: (nickname: string, password: string) => Promise<boolean>;
  signup: (nickname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto de autenticação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);

  // Carregar apelido salvo ao inicializar a aplicação
  useEffect(() => {
    const loadNickname = async () => {
      const storedNickname = await AsyncStorage.getItem('userNickname');
      if (storedNickname) {
        setNickname(storedNickname);
      }
    };
    loadNickname();
  }, []);

  // Função para realizar o cadastro
  const signup = async (nickname: string, email: string, password: string) => {
    if (!nickname || !email || !password) {
      Alert.alert("Erro:", "Algum campo não foi preenchido corretamente.");
      return;
    }
  
    try {
      await AsyncStorage.setItem('userNickname', nickname);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      setNickname(nickname);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro:", error.message);
      } else {
        Alert.alert("Erro:", "Ocorreu um erro ao cadastrar.");
      }
    }
  };
  

  // Função para realizar o login
  const login = async (nickname: string, password: string) => {
    const storedNickname = await AsyncStorage.getItem('userNickname');
    const storedPassword = await AsyncStorage.getItem('userPassword');

    if (nickname === storedNickname && password === storedPassword) {
      setNickname(nickname);
      return true;
    }
    return false;
  };

  // Função para realizar logout
  const logout = async () => {
    await AsyncStorage.removeItem('userNickname');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
    setNickname(null);
  };

  return (
    <AuthContext.Provider value={{ nickname, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
