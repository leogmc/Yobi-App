import * as React from 'react';
import { Alert, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { InputWrapper } from './auth.styles';
import { useState } from 'react';
import { useAuth } from '@/src/state/authContext';
import GoBackButton2 from '@/src/components/GoBackButton2';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormContainer, FormView, InputForm, Logo, Title, ForgotButton, Label, Text, NextButton } from './worker-signup.style';

export default function WorkerSignupScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  // Esquema de validação Yup
  const SignupSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, 'No mínimo 4 caracteres.')
      .max(30, 'No máximo 30 caracteres.')
      .required('O apelido não pode ser vazio.'),
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email não pode ser vazio.'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres.')
      .matches(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra.')
      .matches(/\d/, 'A senha deve conter pelo menos um número.')
      .required('A senha não pode ser vazia.'),
  });

  // // Função para lidar com o signup
  // const handleSignup = async (values: any) => {
  //   const { nickname, email, password } = values;
  //   const success = await signup(nickname, email, password);
  //   if (success == null) {
  //     // router.push('/home/home');
  //   } else {
  //     Alert.alert('Erro:', 'Por favor, preencha todos os campos corretamente.');
  //   }
  // };

    // Função teste
    const handleSignup = async () => {
        router.push('/auth/worker-signup-2');
    };

  // Alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <ScrollView>
    <FormContainer>
      
      <GoBackButton2 />
      <Logo />
      <Title>Cadastre-se</Title>

      <Formik
        initialValues={{ nickname: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
>
  {({ handleChange, handleBlur, values, errors, touched}) => (
    <FormView>
      <Label>Digite seu apelido:</Label>
      <InputForm
        value={values.nickname}
        onChangeText={handleChange('nickname')}
        onBlur={handleBlur('nickname')}
      />
      {touched.nickname && errors.nickname && (
        <Text style={{ color: '#ff7777' }}>{errors.nickname}</Text>
      )}

      <Label>Digite seu e-mail:</Label>
      <InputForm
        keyboardType="email-address"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
      />
      {touched.email && errors.email && (
        <Text style={{ color: '#ff7777' }}>{errors.email}</Text>
      )}

      <Label>Digite sua senha:</Label>
      <InputWrapper>
        <InputForm
          secureTextEntry={!isPasswordVisible}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        <Pressable
          onPress={togglePasswordVisibility}
          style={{ position: 'absolute', right: 10, top: 15 }}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </InputWrapper>
      {touched.password && errors.password && (
        <Text style={{ color: '#FF8477' }}>{errors.password}</Text>
      )}

   
    </FormView>
  )}
</Formik>

    <Pressable onPress={handleSignup}>
      <NextButton>
        <Feather name="arrow-right" size={24} color="#34495E" padding={10} />
      </NextButton>
    </Pressable>

    <ForgotButton>Faça o login</ForgotButton>
        
    </FormContainer>
    </ScrollView>
  );
}
