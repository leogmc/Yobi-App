import { ChatBar } from "@/src/components/ChatBar";
import { Container, Description } from "./styles";
import { FontAwesome6 } from "@expo/vector-icons";

export default function ChatbotScreen() {

  return (
    <Container>
      <Description>O chatbot ainda está em desenvolvimento. Em breve disponivel :)</Description>
      <FontAwesome6 name="gears" color="#34495E" size={64} />
      <ChatBar/>
      </Container>

  );
}