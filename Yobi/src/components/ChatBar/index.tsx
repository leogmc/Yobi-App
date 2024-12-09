import { FontAwesome6 } from '@expo/vector-icons';
import { Container, SearchChatButton, InputChat } from './styles';

type Props = {
    onPress: () => void;
    onChangeText: (text: string) => void;
    value: string;
}

export function ChatBar(){
    return (
    <Container>
        <InputChat 
            placeholder='Insira sua dúvida: '
            keyboardType='default'
            value=""
            >           
        </InputChat>
        <SearchChatButton>
            <FontAwesome6 name="square-arrow-up-right" size={32} color="#34495E"/>
        </SearchChatButton>
    </Container>
    );
}


// type Props = {
//     onPress: () => void;
//     onChangeText: (text: string) => void;
//     value: string;
// }

// export function SearchBar({onPress, onChangeText, value} : Props){
//     return (
//     <Container>
//         <InputChat 
//             placeholder='Buscar tarefa:'
//             keyboardType='default'
//             value={value}
//             onChangeText={onChangeText}>           
//         </InputChat>
//         <SearchChatButton onPress={onPress}>
//             <Feather name="search" size={24} color="#8A5ED1"/>
//         </SearchChatButton>
//     </Container>
//     );
// }