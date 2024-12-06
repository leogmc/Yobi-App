import {
    FormContainer,
    FormView,
    InputForm,
    Logo,
    Title,
    Label,
    Text,
    SubscribeButton,
    PhotoPickerButton,
  } from './worker-form.style';
  import * as React from 'react';
  import { Pressable, ScrollView, Image, StyleSheet, View } from 'react-native';
  import { useState } from 'react';
  import { Formik } from 'formik';
  import * as Yup from 'yup';
  import * as ImagePicker from 'expo-image-picker';
  import { Picker } from '@react-native-picker/picker';
  import GoBackButton from '@/src/components/GoBackButton';
  import { Feather } from '@expo/vector-icons';
  import { router } from 'expo-router';
  import { useAuth} from '@clerk/clerk-expo';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '@/firebase-config';
  
  export default function WorkerFormScreen() {
  
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const { userId, isSignedIn } = useAuth();
  
    // Esquema de validação Yup
    const SignupSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'No mínimo 2 caracteres.')
        .max(30, 'No máximo 30 caracteres.')
        .required('O nome não pode ser vazio.'),
      city: Yup.string()
        .min(2, 'No mínimo 2 caracteres.')
        .max(30, 'No máximo 30 caracteres.')
        .required('A cidade não pode ser vazia.'),
      phone: Yup.string()
        .min(8, 'O telefone deve conter no mínimo 8 dígitos.')
        .required('O telefone não pode ser vazio.'),
      resume: Yup.string().required('Seu resumo não pode ser vazio.'),
      profession: Yup.string().required('Selecione uma profissão.'),
    });
  
    interface WorkerFormValues {
      name: string;
      city: string;
      phone: string;
      resume: string;
      profession: string;
      profilePhoto?: string;
    }

    async function saveWorkerDetails(userId: string, data: WorkerFormValues) {

      if (!isSignedIn) return

      console.log('Tentando salvar dados:', data); 
      console.log('User ID:', userId);

      try {
        await setDoc(doc(db, 'workers', userId), {
          ...data,
          createdAt: new Date().toISOString(),
        });
        console.log('Worker data saved successfully!');
      } catch (error) {
        console.error('Error saving worker data:', error);
      }
    }
  
    const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para acessar suas imagens!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setProfilePhoto(result.assets[0].uri);
      }
    };
  
    const handleRegister = async (values: WorkerFormValues) => {
      console.log('HandleRegister chamado com:', values); // Verifique se isso aparece no console

      console.log('User ID:', userId); // Verifique o que aparece aqui
    
      if (!userId) {
        console.error('Usuário não autenticado!');
        return;
      }
    
      try {
        await saveWorkerDetails(userId, {
          ...values,
          profilePhoto: profilePhoto ?? undefined, // Garante compatibilidade de tipo
        });
    
        alert('Cadastro realizado com sucesso!');
        router.replace('/(auth)/services'); // Redireciona após o cadastro
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        alert('Houve um erro ao cadastrar. Tente novamente.');
      }
    };
    
  
    return (

      <ScrollView>
        <FormContainer>
          <GoBackButton />
          <Logo />
          <Title>Cadastre-se</Title>
  
          <Formik
            initialValues={{
              name: '',
              city: '',
              phone: '',
              resume: '',
              profession: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              
              <FormView>
  
                <Label>Nome completo:</Label>
                <InputForm
                  placeholder="Digite seu nome"
                  placeholderTextColor={"#ccc"}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {touched.name && errors.name && <Text style={{ color: '#ff7777' }}>{errors.name}</Text>}
  
                <Label>Digite sua cidade:</Label>
                <InputForm
                  placeholder="Ex: Feira de Santana"
                  placeholderTextColor={"#ccc"}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                />
                {touched.city && errors.city && <Text style={{ color: '#ff7777' }}>{errors.city}</Text>}
  

                <Label>Selecione uma profissão:</Label>
  
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.profession}
                    onValueChange={(itemValue) => setFieldValue('profession', itemValue)}
                    dropdownIconColor={"#FFF"}
                    placeholder="Selecione:"
                  >
            
                    <Picker.Item label="Pedreiro" value="pedreiro" />
                    <Picker.Item label="Marceneiro" value="marceneiro" />
                    <Picker.Item label="Pintor" value="pintor" />
                    <Picker.Item label="Eletricista" value="eletricista" />
                  </Picker>
                </View>
                  {touched.profession && errors.profession && <Text style={{ color: '#ff7777' }}>{errors.profession}</Text>}
     
  
                <Label>Insira seu telefone para contato:</Label>
                <InputForm
                  placeholder="Digite seu telefone"
                  placeholderTextColor={"#ccc"}
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />
                {touched.phone && errors.phone && <Text style={{ color: '#ff7777' }}>{errors.phone}</Text>}
  
                <Label>Adicione uma foto de perfil:</Label>
                <Pressable onPress={pickImage}>
                  <PhotoPickerButton>
                    <Feather name="camera" size={24} />
                  </PhotoPickerButton>
                </Pressable>
                {profilePhoto && (
                  <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                )}
                <Label>Fale um pouco sobre você:</Label>
                <InputForm
                  placeholder="Fale um pouco sobre você"
                  placeholderTextColor={"#ccc"}
                  value={values.resume}
                  onChangeText={handleChange('resume')}
                  onBlur={handleBlur('resume')}
                />
                {touched.resume && errors.resume && <Text style={{ color: '#ff7777' }}>{errors.resume}</Text>}
  
                <Pressable onPress={() => handleSubmit()}>
                  <SubscribeButton>Cadastrar</SubscribeButton>
                </Pressable>
              </FormView>
            )}
          </Formik>
  
          <Pressable onPress={() => router.replace('/(public)/login')}>
            <Text>Faça o login</Text>
          </Pressable>
        </FormContainer>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    pickerContainer: {
      borderWidth: 2, // Define a espessura da borda
      borderColor: '#FFF', // Cor da borda
      borderRadius: 8, // Bordas arredondadas (opcional)
      paddingHorizontal: 10, // Espaçamento interno para o Picker não encostar na borda
      marginVertical: 10, // Espaçamento externo (opcional)
    },
  });
  
  