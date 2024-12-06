import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { Label, InputWrapper, Logo } from './auth.styles';
import { InputForm, Title, FormContainer, FormView, LoginButton, ForgotButton } from './login.styles';
import GoBackButton from '@/src/components/GoBackButton';
import { Feather } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";
import { useSignIn } from '@clerk/clerk-expo';

export default function LoginScreen() {

  const { isLoaded, setActive, signIn } = useSignIn();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  // Validation Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email não pode ser vazio.'),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .matches(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra.")
      .matches(/\d/, "A senha deve conter pelo menos um número.")
      .required("A senha não pode ser vazia."),
  });

  interface LoginFormValues {
    email: string;
    password: string;
  }

  async function handleSignIn(values: LoginFormValues) {
    if (!isLoaded) return;
    try {
      const signinUser = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      await setActive({ session: signinUser.createdSessionId });
    } catch (e) {
      console.log(e);
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <FormContainer>
      <GoBackButton />
      <Logo />
      <Title>Login</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <FormView>
            <Label>Digite seu email:</Label>
            <InputForm
              placeholder="exemplo@gmail.com"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={{ color: "#FF8477" }}>{errors.email}</Text>
            )}

            <Label>Digite sua senha:</Label>
            <InputWrapper>
              <InputForm
                placeholder="Digite sua senha"
                keyboardType="default"
                autoCapitalize="none"
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
              <Text style={{ color: "#FF8477" }}>{errors.password}</Text>
            )}

            <Pressable onPress={() => handleSubmit()}>
              <LoginButton>Login</LoginButton>
            </Pressable>
          </FormView>
        )}
      </Formik>

      <ForgotButton>Esqueceu sua senha?</ForgotButton>
    </FormContainer>
  );
}
