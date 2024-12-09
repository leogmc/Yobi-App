import React from "react";
import { CategoryBox, CategoryIcon, CategoryText, Container } from "./styles";
import { FontAwesome6 } from "@expo/vector-icons";

type WorkerCategoriesProps = {
  onCategorySelect: (category: string) => void;
};

export default function WorkerCategories({
  onCategorySelect,
}: WorkerCategoriesProps) {
  return (
    <Container>
      <CategoryBox onTouchEnd={() => onCategorySelect("Pedreiro")}>
        <CategoryIcon>
          <FontAwesome6 name="person-digging" color="#34495E" size={22} />
        </CategoryIcon>
        <CategoryText>Pedreiro</CategoryText>
      </CategoryBox>

      <CategoryBox onTouchEnd={() => onCategorySelect("Marceneiro")}>
        <CategoryIcon>
          <FontAwesome6 name="hammer" color="#34495E" size={22} />
        </CategoryIcon>
        <CategoryText>Marceneiro</CategoryText>
      </CategoryBox>

      <CategoryBox onTouchEnd={() => onCategorySelect("Pintor")}>
        <CategoryIcon>
          <FontAwesome6 name="paint-roller" color="#34495E" size={22} />
        </CategoryIcon>
        <CategoryText>Pintor</CategoryText>
      </CategoryBox>

      <CategoryBox onTouchEnd={() => onCategorySelect("Eletricista")}>
        <CategoryIcon>
          <FontAwesome6 name="bolt" color="#34495E" size={22} />
        </CategoryIcon>
        <CategoryText>Eletricista</CategoryText>
      </CategoryBox>
    </Container>
  );
}
