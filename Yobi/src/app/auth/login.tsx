import * as React from 'react';
import { Pressable, Alert} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Label, InputWrapper, Text, Logo} from './auth.styles';
import { InputForm, Title, FormContainer, FormView, LoginButton, ForgotButton,} from './login.styles';
import { useState } from 'react';
import { useAuth } from '@/src/state/authContext';
import GoBackButton from '@/src/components/GoBackButton';
import { Feather } from '@expo/vector-icons';
import {Formik} from "formik";
import * as Yup from "yup";

export default function LoginScreen() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  //Validation
  const LoginSchema = Yup.object().shape({
    nickNameText: Yup.string()
      .min(4, "No mínimo 4 caracteres.")
      .max(30, "No máximo 30 caracteres.")
      .required("O apelido não pode ser vazio."),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .matches(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra.")
      .matches(/\d/, "A senha deve conter pelo menos um número.")
      .required("A senha não pode ser vazia.")
  });


  const handleLogin = async (values : any) => {
    const { nickNameText, password } = values;
    const success = await login(nickNameText, password);
    if (success) {
     // router.push('/home/home');
    } else {
      Alert.alert("Erro:", "Apelido ou senha incorretos.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <FormContainer>
      <GoBackButton />
      <Logo/>
    
      <Formik
        initialValues={{nickNameText:"", password:""}}
        validationSchema={LoginSchema}
        onSubmit={handleLogin} 
        >

      {({handleChange, handleBlur, values, errors, touched})=>(
        <FormView>
          
          <Title>Login</Title>
          <Label>Digite seu apelido:</Label>
          <InputForm
            placeholder="Digite seu apelido:"
            keyboardType="default"
            value={values.nickNameText}
            onChangeText={handleChange("nickNameText")}
            onBlur={handleBlur("nickNameText")}
          />

          {touched.nickNameText && errors.nickNameText&& (
            <Text style={{color: "#FF8477"}}>{errors.nickNameText}</Text>
          )}

       
      <Label>Digite sua senha:</Label>
      <InputWrapper>
        <InputForm
          placeholder="Digite sua senha:"
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={!isPasswordVisible}
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        <Pressable onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 15 }}>
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

    
      </FormView>
        )}
      </Formik>

      <Link href="/home/home" asChild>
        <Pressable onPress={handleLogin}>
          <LoginButton>Login</LoginButton>
        </Pressable>
      </Link>

      <ForgotButton>Esqueceu sua senha?</ForgotButton>

    </FormContainer>
  );
}

