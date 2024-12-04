import { Feather } from '@expo/vector-icons';
import {Container, TaskDone, TaskText, TaskDelete, TaskTextContainer, TaskTextLineThrough} from './styles';
import { TaskProps } from '@/src/utils/types';

interface Props extends TaskProps {
    onCheck?: () => void;
    onRemove?: () => void;
}

export function Task({ title, status, onCheck, onRemove }: Props){

    return (
        <Container>
            <TaskDone onPress={onCheck}>
                {!status && <Feather name="circle" size={24} color="#8A5ED1"/>}
                {status && <Feather name="check-circle" size={24} color="#2D6C4A"/>}
            </TaskDone>
            <TaskTextContainer>
                <TaskText>{!status && title}</TaskText>
                <TaskTextLineThrough>{status && title}</TaskTextLineThrough>
            </TaskTextContainer>
            <TaskDelete onPress={onRemove}>
                <Feather name="trash" size={24} color="#6B6572"/>
            </TaskDelete>
        </Container>
    );
}