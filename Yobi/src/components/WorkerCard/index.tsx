import {Container, WorkerProfile, WorkerInfo, Logo, Profession, ProfessionText, Title, Button, Subtitle} from './styles'
import { FontAwesome6 } from '@expo/vector-icons';
import { WorkerProps } from '@/src/@types/worker';
import { TouchableOpacity } from 'react-native';

interface WorkerCardProps extends WorkerProps {
  onPress: () => void;
}

export function WorkerCard({ name, profession, onPress }: WorkerCardProps) {
  return (
    <Container>
      <WorkerProfile>
        <FontAwesome6 name="user-tie" color="#34495E" size={24} />
      </WorkerProfile>
      <WorkerInfo>
        <Title>{name}</Title>
        <Profession>
          <ProfessionText>{profession}</ProfessionText>
        </Profession>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
        >
          <Button>
            <Subtitle>Entrar em contato</Subtitle>
            <FontAwesome6 name="circle-right" color="#34495E" size={18} />
          </Button>
        </TouchableOpacity>
      </WorkerInfo>
      <Logo>
        <FontAwesome6 name="award" color="#D7B377" size={32} />
      </Logo>
    </Container>
  );
}
