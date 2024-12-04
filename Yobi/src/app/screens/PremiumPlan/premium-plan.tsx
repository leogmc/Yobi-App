import * as React from 'react';
import { Container, Title, Subtitle, Logo, LogoContainer, CardContainer, PremiumPlanCard, PremiumButton, StandardButton } from './premium-plan.style';
import { UserProfileCard } from '@/src/components/UserProfileCard';
import { WorkerProfileCard } from '@/src/components/WorkerProfileCard';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';

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

    <ScrollView>
    <Container>
      <LogoContainer>
        <Logo/>
        <Title> Prestadores de serviço </Title>
      </LogoContainer>
      <PremiumPlanCard/>
      <Subtitle>+ Fique no topo das listas de profissionais</Subtitle>
      <Subtitle>+ Garanta mais clientes</Subtitle>
      <Subtitle>+ Fique recomendado na plataforma</Subtitle>
      <Subtitle>+ Lucre muito mais!</Subtitle>
      <Pressable >
      <PremiumButton> Quero ser premium </PremiumButton>
      </Pressable>

    <StandardButton>Continuar com plano padrão</StandardButton>
      
      </Container>
      </ScrollView>
    
  );
}