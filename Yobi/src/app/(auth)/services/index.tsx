import React, { useEffect, useState } from "react";
import { ScrollView, Text, Alert, Linking } from "react-native";
import { Container, Title, Workers } from "./styles";
import { WorkerCard } from "@/src/components/WorkerCard";
import { fetchWorkers } from "@/src/services/firestore";
import { WorkerProps } from "@/src/@types/worker";
import WorkerCategories from "@/src/components/WorkerCategories";

export default function ServicesScreen() {
  const [workers, setWorkers] = useState<WorkerProps[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function formatPhoneNumber(phone: string): string {
    // Remove quaisquer caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "");
    // Certifique-se de que há 11 dígitos (DDD + número)
    if (cleanPhone.length === 11) {
      return cleanPhone;
    }
    throw new Error("Número de telefone inválido");
  }
  

  useEffect(() => {
    const loadWorkers = async () => {
      const data = await fetchWorkers();
      setWorkers(data);
    };

    loadWorkers();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = workers.filter(
        (worker) => worker.profession === selectedCategory
      );
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers(workers);
    }
  }, [selectedCategory, workers]);

  const handleWhatsAppPress = (phone?: string) => {
    if (!phone) {
      Alert.alert("Erro", "O número de telefone não está disponível.");
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(phone);
      const message = "Olá! Estou interessado em seus serviços.";
      const whatsappUrl = `https://wa.me/55${formattedPhone}?text=${encodeURIComponent(
        message
      )}`;

      Linking.openURL(whatsappUrl).catch((err) => {
        console.error("Erro ao abrir o WhatsApp:", err);
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
      });
    } catch (error) {
      Alert.alert("Erro", "Número de telefone inválido.");
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView>
      <Container>
        <Title>Categorias</Title>
        <WorkerCategories onCategorySelect={handleCategorySelect} />

        <Title>Profissionais</Title>
        <Workers>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                name={worker.name}
                profession={worker.profession}
                profilePhoto={worker.profilePhoto}
                city={worker.city}
                onPress={() => handleWhatsAppPress(worker.phone)}
              />
            ))
          ) : (
            <Text>
              {selectedCategory
                ? `Nenhum "${selectedCategory}" encontrado.`
                : "Carregando profissionais..."}
            </Text>
          )}
        </Workers>
      </Container>
    </ScrollView>
  );
}
