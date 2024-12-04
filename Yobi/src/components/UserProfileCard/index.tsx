import { Container, Subtitle, Title, UserCard, UserIcon} from './styles';

interface UserProfileCardProps {
    onPress?: () => void;
  }

export function UserProfileCard({ onPress }: UserProfileCardProps){
    return (
    <Container onPress={onPress}>   
        <UserCard>
            <UserIcon/>
        </UserCard>
        <Title>Sou cliente</Title>
        <Subtitle>e gostaria de desfrutar das funcionalidades da Yobi!</Subtitle>
    </Container>
    );
}