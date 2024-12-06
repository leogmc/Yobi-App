import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Label, InputWrapper,Text } from './auth.styles';
import { useState } from 'react';
import GoBackButton from '@/src/components/GoBackButton';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormContainer, FormView, InputForm, Logo, Title, Subtitle, SubscribeButton, ForgotButton } from './user-register.style';
import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'

export default function UserRegisterScreen() {

  const { isLoaded,setActive, signUp } = useSignUp();
  const [pendingEmailCode, setPendingEmailCode] = useState(false);
  const [code, setCode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  // Esquema de validação Yup
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email não pode ser vazio.'),
    password: Yup.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres.')
      .matches(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra.')
      .matches(/\d/, 'A senha deve conter pelo menos um número.')
      .required('A senha não pode ser vazia.'),
  });


  interface SignUpFormValues {
    email: string;
    password: string;
  }

    // Função para lidar com o signup
    async function handleSignup(values: SignUpFormValues){
      if(!isLoaded) return;

      try{
        await signUp.create({
          emailAddress: values.email,
          password: values.password
        })

        // Adicionando tipo de usuário
        await SecureStore.setItemAsync("user_role", "common"); 

        await signUp.prepareEmailAddressVerification({strategy: "email_code"})
        setPendingEmailCode(true);

      } catch(e) {
        console.log(e);
      }
    };

    async function handleVerifyUser() {
      if (!isLoaded) return;
      try{
        const completeSignup = await signUp?.attemptEmailAddressVerification({
          code
        })
      await setActive({session: completeSignup.createdSessionId})
      } catch(e){
        console.log(e);
      }
    }

  // Alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  return (
    <FormContainer>
      <GoBackButton />
      <Logo />
      <Title>Inscreva-se</Title>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
      <FormView>
      {!pendingEmailCode && (
        <View>
          <Label>Digite seu e-mail:</Label>
            <InputForm
              placeholder="Digite seu e-mail:"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={{ color: '#ff7777' }}>{errors.email}</Text>
            )}

            <Label>Digite sua senha:</Label>
            <InputWrapper>
              <InputForm
                placeholder="Digite sua senha:"
                secureTextEntry={!isPasswordVisible}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={{ position: 'absolute', right: 10, top: 15 }}
              >
                <Feather
                  name={isPasswordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#34495E"
                />
              </Pressable>
            </InputWrapper>
            {touched.password && errors.password && (
              <Text style={{ color: '#FF8477' }}>{errors.password}</Text>
            )}

          <Pressable onPress={() => handleSubmit()}>
            <SubscribeButton>Cadastre-se</SubscribeButton>
          </Pressable>

          <Pressable onPress={() => router.replace("/(public)/login")}>
            <ForgotButton>Faça o login</ForgotButton>
          </Pressable>

        </View>
      )}

      {pendingEmailCode && (
        <View>
          <Subtitle>Digite o código que enviamos para seu email:</Subtitle>
          <InputForm
              placeholder="Digite o código:"
              keyboardType="default"
              value={code}
              onChangeText={setCode}
            />
          <Pressable onPress={handleVerifyUser}>
            <SubscribeButton>Ativar conta</SubscribeButton>
          </Pressable>

          
        </View>
      )}

  
      </FormView>
  )}
</Formik>
    
    </FormContainer>
  );
}
