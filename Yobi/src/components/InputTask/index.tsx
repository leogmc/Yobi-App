
import { Container, InputTask } from './styles';

type Props = {
    onChangeText: (text: string) => void;
    onBlur: (e: any) => void;
    value: string;
}

export function InputAddTask({onChangeText, onBlur, value} : Props){
    return (
    <Container>

        <InputTask 
            placeholder='Insira uma tarefa:'
            keyboardType='default'
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
        >
            
        </InputTask>
    
    </Container>
    );
}

