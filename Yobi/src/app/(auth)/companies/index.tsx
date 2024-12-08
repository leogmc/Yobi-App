import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Companies, Container, Text, Title } from "./styles";
import { SearchBar } from "@/src/components/SearchBar";
import { CompanyCard } from "@/src/components/CompanyCard";
import { CompanyProps } from "@/src/@types/company";

export default function CompaniesScreen() {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [searchText, setSearchText] = useState(""); // Estado para a busca
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch(
          "https://yobi-enterprise-default-rtdb.firebaseio.com/yobiecologic/usuarios.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Transformar o objeto em array
        const companiesArray: CompanyProps[] = Object.keys(data).map((key) => {
          const possuiCertificacoes =
            data[key].possuiCertificacoes || Boolean(data[key].certificados);

          const company: CompanyProps = {
            ...data[key],
            possuiCertificacoes,
          };

          return company;
        });

        setCompanies(companiesArray);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro ao buscar empresas:", error.message);
        } else {
          console.error("Erro desconhecido:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.nomeDaEmpresa.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <Text>
          Faça o descarte correto dos materiais de sua obra e contribua para um
          futuro mais sustentável!
        </Text>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onPress={() => console.log("Pesquisar texto:", searchText)}
        />
        <Title>Empresas de descarte:</Title>
        <Companies>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <CompanyCard
                key={index}
                nomeDaEmpresa={company.nomeDaEmpresa}
                possuiCertificacoes={company.possuiCertificacoes}
              />
            ))
          ) : (
            <Text>Nenhuma empresa encontrada para "{searchText}"</Text>
          )}
        </Companies>
      </Container>
    </ScrollView>
  );
}
