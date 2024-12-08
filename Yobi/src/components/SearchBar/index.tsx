import { FontAwesome } from '@expo/vector-icons';
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
            placeholder='Busque pelo nome da empresa: '
            keyboardType='default'
            value={value}
            onChangeText={onChangeText}
            >           
        </InputTask>
        <SearchTaskButton onPress={onPress}>
            <FontAwesome name="search" size={24} color="#34495E"/>
        </SearchTaskButton>
    </Container>
    );
}

