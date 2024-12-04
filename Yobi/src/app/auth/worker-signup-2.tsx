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
import { FormContainer, FormView, InputForm, ForgotButton, Label, Text, NextButton, PhotoPickerButton } from './worker-signup.style';
import {Picker} from '@react-native-picker/picker';
import { Image, View } from 'react-native'; // Para exibir a imagem
import { PermissionsAndroid, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function WorkerSignupScreen2() {

  const [selectedOption, setSelectedOption] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const router = useRouter();
  const { signup } = useAuth();

  // Esquema de validação Yup
  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'No mínimo 4 caracteres.').max(30, 'No máximo 30 caracteres.').required('O nome não pode ser vazio.'),
    city: Yup.string().min(2, 'No mínimo 4 caracteres.').max(30, 'No máximo 30 caracteres.').required('A cidade não pode ser vazia.'),
    phone: Yup.string().min(8, 'O telefone deve conter no mínimo 8 dígitos.').required('O telefone não pode ser vazio.'),
    resume: Yup.string().required('Seu resumo não pode ser vazio.'),
    option: Yup.string().required('Selecione uma opção.'),
    
  });

  const handleSignup = async () => {
    try {
      // Realize qualquer lógica necessária, como validação extra ou comunicação com a API
      console.log('Realizando o cadastro...');
  
      // Após completar o processo de signup, redirecione para a tela PremiumPlan
      router.push('/screens/PremiumPlan/premium-plan');
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
      Alert.alert('Erro', 'Não foi possível concluir o cadastro. Tente novamente.');
    }
  };
  


  const pickImage = async () => {
    // Solicita permissão para acessar as imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar suas imagens!');
      return;
    }

    // Abre a galeria para selecionar uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsEditing: true, // Permite ao usuário editar a imagem (opcional)
      aspect: [1, 1], // Proporção opcional (4:3 nesse caso)
      quality: 1, // Qualidade da imagem (1 = máxima qualidade)
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri); // Define a URI da imagem selecionada
    }
  };


  return (
    <ScrollView>
    <FormContainer>
      <GoBackButton2 />

    
      <Formik
        initialValues={{ name: '', city: '', phone: '', resume: '', profession: ''}}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, values, errors, touched, setFieldValue}) => (
          <FormView>
            <Label>Insira seu nome e sobrenome:</Label>
            <InputForm
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && (
              <Text style={{ color: '#ff7777' }}>{errors.name}</Text>
            )}

      <Label>Digite sua cidade:</Label>
      <InputForm
        value={values.city}
        onChangeText={handleChange('city')}
        onBlur={handleBlur('city')}
      />
      {touched.city && errors.city && (
        <Text style={{ color: '#ff7777' }}>{errors.city}</Text>
      )}


      {/* Dropdown */}
        <Label>Selecione sua profissão:</Label>
          <View style={{ borderWidth: 2, borderColor: '#ffffff', borderRadius: 6, backgroundColor: 'transparent' }}>
            <Picker style={{color:'#fff'}}
              selectedValue={values.profession}
              onValueChange={(itemValue: string) => setFieldValue('profession', itemValue)}
          >
              <Picker.Item label="Selecione uma opção" value=""/>
              <Picker.Item label="Pedreiro" value="pedreiro" />
              <Picker.Item label="Marceneiro" value="marceneiro" />
              <Picker.Item label="Pintor" value="pintor" />
              <Picker.Item label="Eletricista" value="eletricista" />
            </Picker>
          </View>
            {touched.profession && errors.profession && (
              <Text style={{ color: '#FF8477' }}>{errors.profession}</Text>
          )}

      <Label>Insira seu telefone para contato:</Label>
      <InputWrapper>
        <InputForm
          value={values.phone}
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
        />
      </InputWrapper>
      {touched.phone && errors.phone && (
        <Text style={{ color: '#FF8477' }}>{errors.phone}</Text>
      )}

       {/* Upload de Imagem */}
       <Label>Adicione uma foto de perfil:</Label>
            <Pressable onPress={pickImage}>
              <PhotoPickerButton>
                <Feather name="camera" size={24} color="#34495E" />
              </PhotoPickerButton>
            </Pressable>
            {profilePhoto && (
              <Image
                source={{ uri: profilePhoto }}
                style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
              />
            )}
    

      <Label>Fale um pouco sobre você:</Label>
      <InputWrapper>
        <InputForm
          value={values.resume}
          onChangeText={handleChange('resume')}
          onBlur={handleBlur('resume')}
        />
      </InputWrapper>
      {touched.resume && errors.resume && (
        <Text style={{ color: '#FF8477' }}>{errors.resume}</Text>
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
