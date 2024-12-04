import * as React from 'react';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Container, LoginButton, Title, SubscribeButton, Subtitle, AcessButtons, Logo, LogoContainer } from './auth.styles';

export default function AuthScreen() {

  return (

    <Container>
      <LogoContainer>
        <Logo/>
        <Title> Yobi </Title>
        <Subtitle> Sua obra do início ao fim</Subtitle>
      </LogoContainer>
      <AcessButtons>
        <Link href="/auth/login" asChild>
          <Pressable>
            <LoginButton>Login</LoginButton>
          </Pressable>
        </Link>
        <Link href="/auth/profile" asChild>
          <Pressable>
            <SubscribeButton>Cadastre-se</SubscribeButton>
          </Pressable>
        </Link>
      </AcessButtons>
      </Container>
    
  );
}

