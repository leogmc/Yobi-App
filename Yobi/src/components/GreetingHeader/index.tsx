import * as React from 'react';
import { Container, Greeting } from './styles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/state/authContext';
import { Pressable } from 'react-native';

export default function GreetingHeader() {

  const { logout } = useAuth();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const loadNickname = async () => {
      const storedNickname = await AsyncStorage.getItem('userNickname');
      if (storedNickname) {
        setNickname(storedNickname);
      }
    };

    loadNickname();
  }, []);
    
  return (
    
    <Container>
        <Greeting>Olá, {nickname}!</Greeting>
        <Pressable onPress={logout}>
          <Feather name="log-out" size={24} color="#8A5ED1"/>
        </Pressable>
    </Container>
    
  );
}
