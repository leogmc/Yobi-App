import { Container, StoreInfo, StoreProfile, Text } from './styles';
import { FontAwesome6 } from '@expo/vector-icons';
import { StoreProps } from '@/src/@types/store';
import { TouchableOpacity } from 'react-native';

interface StoreCardProps extends StoreProps {
  onPress: () => void;
}

export function StoreCard({ nomeDaEmpresa, onPress }: StoreCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{ borderRadius: 6 }} // Garantir o estilo arredondado
    >
      <Container>
        <StoreProfile>
          <FontAwesome6 name="store" color="#34495E" size={24} />
        </StoreProfile>
        <StoreInfo>
          <Text>{nomeDaEmpresa}</Text>
        </StoreInfo>
      </Container>
    </TouchableOpacity>
  );
}
