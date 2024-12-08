import * as React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Label, InputWrapper, Text } from './auth.styles';
import { useState } from 'react';
import GoBackButton from '@/src/components/GoBackButton';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormContainer, FormView, InputForm, Logo, Title, Subtitle, SubscribeButton, ForgotButton } from './user-register.style';
import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

export default function UserRegisterScreen() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [pendingEmailCode, setPendingEmailCode] = useState(false);
  const [code, setCode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState(""); // Armazena o nome do usuário

  // Esquema de validação Yup
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome não pode ser vazio.'),
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
    name: string;
    email: string;
    password: string;
    role: string;
  }

  // Salvar dados do usuário no Firestore
  async function saveUserDetails(userId: any, data: Omit<SignUpFormValues, 'password'>) {

    try {
      await setDoc(doc(db, 'users', userId), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      console.log('Dados do usuário salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  }

  // Função para lidar com o signup
  async function handleSignup(values: SignUpFormValues) {

    if (!isLoaded) return;

    try {
      // Armazena o nome do usuário para uso posterior
      setName(values.name);

      // Cria o usuário no Clerk
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      // Prepara a verificação de email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingEmailCode(true);
    } catch (e) {
      console.log(e);
    }
  }

  // Verificar usuário e salvar dados no Firestore
  async function handleVerifyUser() {
    if (!isLoaded) return;

    try {
      const completeSignup = await signUp?.attemptEmailAddressVerification({
        code,
      });

      // Ativa a sessão
      await setActive({ session: completeSignup.createdSessionId });

      // Obtém o userId do Clerk
      const userId = completeSignup.createdUserId;

      // Salva os dados no Firestore
      await saveUserDetails(userId, {
        name: name, // Usa o nome armazenado
        email: signUp.emailAddress || '',
        role: 'common',
      });

      alert('Conta ativada com sucesso!');
    } catch (e) {
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
        initialValues={{ name: '', email: '', password: '', role: 'common' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <FormView>
            {!pendingEmailCode && (
              <View style={styles.container}>
                <Label>Digite seu nome:</Label>
                <InputForm
                  placeholder="Digite seu nome:"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <Text style={{ color: '#ff7777' }}>{errors.name}</Text>
                )}

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

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
  },
});
