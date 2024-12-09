import * as React from 'react';
import { Container, Greeting, Greetings, ProfilePhoto, SubGreeting } from './styles';
import { useUser } from '@/src/hooks/UserContext';
import { Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function GreetingHeader() {
  const { userData, workerData, isLoading, error } = useUser();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const activeData = workerData ?? userData;

  return (
    <Container>
      <Greetings>
        <Greeting>{activeData?.name}</Greeting>
        <SubGreeting> Bem-vindo de volta!</SubGreeting>
      </Greetings>
      <ProfilePhoto>
        <FontAwesome6 name="user-tie" color="#34495E" size={24} />
      </ProfilePhoto>
    </Container>
  );
}
