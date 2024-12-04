import { Feather } from '@expo/vector-icons';
import { Container, SearchTaskButton, InputTask } from './styles';

type Props = {
    onPress: () => void;
    onChangeText: (text: string) => void;
    value: string;
}

export function SearchBar({onPress, onChangeText, value} : Props){
    return (
    <Container>
        <InputTask 
            placeholder='Buscar tarefa:'
            keyboardType='default'
            value={value}
            onChangeText={onChangeText}>           
        </InputTask>
        <SearchTaskButton onPress={onPress}>
            <Feather name="search" size={24} color="#8A5ED1"/>
        </SearchTaskButton>
    </Container>
    );
}