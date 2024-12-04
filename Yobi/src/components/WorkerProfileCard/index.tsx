import { Container, Subtitle, Title, UserCard, WorkerIcon} from './styles';

interface WorkerProfileCardProps {
    onPress?: () => void;
  }

export function WorkerProfileCard({onPress}: WorkerProfileCardProps){
    return (
    <Container onPress={onPress}>   
        <UserCard>
            <WorkerIcon/>
        </UserCard>
        <Title>Sou Profissional</Title>
        <Subtitle>e gostaria de anunciar meus serviços na plataforma Yobi!</Subtitle>
    </Container>
    );
}