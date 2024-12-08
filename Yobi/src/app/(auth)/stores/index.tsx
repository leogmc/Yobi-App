import React, { useEffect, useState } from "react";
import { ScrollView, Text, ActivityIndicator, Alert, Linking } from "react-native";
import { Container, StoreList, Title } from "./styles";
import { StoreCard } from "@/src/components/StoreCard";
import GreetingHeader from "@/src/components/GreetingHeader";
import { SearchBar } from "@/src/components/SearchBar";
import { StoreProps } from "@/src/@types/store";

export default function StoresScreen() {
  const [stores, setStores] = useState<StoreProps[]>([]);
  const [searchText, setSearchText] = useState(""); // Estado para a busca
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch(
          "https://yobi-enterprise-default-rtdb.firebaseio.com/yobienterprise/usuarios.json"
        );
        const data = await response.json();

        // Ajusta o formato dos dados para ser compatível com a interface
        const storesArray: StoreProps[] = Object.keys(data).map((key) => ({
          ...data[key],
        }));
        setStores(storesArray);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) =>
    store.nomeDaEmpresa.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleWhatsAppPress = (phoneNumber: string) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D+/g, ''); // Remove todos os caracteres não numéricos
    const formattedPhoneNumber = `55${cleanedPhoneNumber}`; // Adicione o código do país
    const message = "Olá! Estou interessado em saber mais sobre a sua loja.";
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`;

  
    Linking.openURL(whatsappUrl).catch((err) => {
      console.error("Erro ao tentar abrir o WhatsApp:", err);
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });
  };
  
  
  
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </Container>
    );
  }

  return (
    <ScrollView>
      <Container>
        <GreetingHeader />
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onPress={() => console.log("Pesquisar texto:", searchText)}
        />
        <Title>Lojas recomendadas</Title>
        <StoreList>
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
          <StoreCard
            key={index}
            nomeDaEmpresa={store.nomeDaEmpresa}
            telefone={store.telefone}
            onPress={() => {
              console.log("Tentando redirecionar para WhatsApp:", store.telefone);
              handleWhatsAppPress(store.telefone);
            }}
          />


            ))
          ) : (
            <Text>Nenhuma loja chamada "{searchText}" foi encontrada.</Text>
          )}
        </StoreList>
      </Container>
    </ScrollView>
  );
}
