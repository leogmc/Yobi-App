import {Container,CompanyProfile,CompanyInfo, ProfessionText, Title, Button, Subtitle, Certification} from './styles'
import { FontAwesome6 } from '@expo/vector-icons';
import { CompanyProps } from '@/src/@types/company';

export function CompanyCard({ nomeDaEmpresa, possuiCertificacoes }: CompanyProps) {
  return (
    <Container>
      <CompanyProfile>
        <FontAwesome6 name="recycle" color="#34495E" size={48} />
      </CompanyProfile>
      <CompanyInfo>
        <Title>{nomeDaEmpresa}</Title>
        {possuiCertificacoes && (
          <Certification>
            <ProfessionText>Certificada</ProfessionText>
          </Certification>
        )}
        <Button>
          <Subtitle>Entrar em contato</Subtitle>
          <FontAwesome6 name="circle-right" color="#34495E" size={18} />
        </Button>
      </CompanyInfo>
    </Container>
  );
}
