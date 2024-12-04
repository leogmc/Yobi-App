import {Container, Task, TaskCreatedCounter, TaskDoneCounter, TaskText} from './styles'

type Props = {
    created: number;
    completed: number;
}

export function TaskCounters({created, completed} : Props){

  return (
    <Container>
      <Task>
        <TaskText>Tarefas criadas: </TaskText>
        <TaskCreatedCounter>{created}</TaskCreatedCounter>
      </Task>        
      <Task>
        <TaskText>Concluídas: </TaskText>
        <TaskDoneCounter>{completed}</TaskDoneCounter>
      </Task>               
    </Container>  
        
  );
}

