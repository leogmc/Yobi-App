import * as React from 'react';
import { Container, Title, Subtitle, Logo, LogoContainer, CardContainer } from './profile.style';
import { UserProfileCard } from '@/src/components/UserProfileCard';
import { WorkerProfileCard } from '@/src/components/WorkerProfileCard';
import { Link, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function Profile() {

  const router = useRouter();

  const goToUserSignUp = () => {
    console.log("Clicado!");
      router.push('/auth/user-signup');   
  };

  const goToWorkerSignUp = () => {
    console.log("Clicado!");
      router.push('/auth/worker-signup');   
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