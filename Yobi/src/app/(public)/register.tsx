import * as React from 'react';
import { Container, Title, Subtitle, Logo, LogoContainer, CardContainer } from './register.style';
import { UserProfileCard } from '@/src/components/UserProfileCard';
import { WorkerProfileCard } from '@/src/components/WorkerProfileCard';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';


export default function Register() {

  const router = useRouter();

  const goToUserSignUp = () => {
      router.push('/(public)/user-register');   
  };

  const goToWorkerSignUp = () => {
      router.push('/(public)/worker-register');   
  };

  return (

    <Container>
      <LogoContainer>
        <Logo/>
        <Title> Seja bem-vindo(a)! </Title>
        <Subtitle> Para uma experiência perfeita, por gentileza nos diga qual o seu perfil:</Subtitle>
      </LogoContainer>

      
      <CardContainer>
        <Pressable >      
            <UserProfileCard onPress={goToUserSignUp}></UserProfileCard>     
        </Pressable>
      
        <Pressable>
            <WorkerProfileCard onPress={goToWorkerSignUp}></WorkerProfileCard>
        </Pressable>

      </CardContainer>
      
      </Container>
    
  );
}