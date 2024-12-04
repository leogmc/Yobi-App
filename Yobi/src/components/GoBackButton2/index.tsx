import * as React from 'react';
import { Container, TextButton} from './styles';
import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';

export default function GoBackButton2() {

    
  return (
    
    <Container>

        <Pressable onPress={()=> router.back()}>
          <Feather name="chevron-left" size={32} color="#FFFFFF"/>
        </Pressable>
        <TextButton onPress={()=> router.back()}>Voltar</TextButton>
   
    </Container>
    
  );
}
