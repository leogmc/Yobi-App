import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    align-self: flex-start;
    width: 100%;
    padding-left:8px;
    padding-right:8px;
`;

export const Greeting = styled.Text`
    color: #8A5ED1;
    font-family:'Inter-Bold';
    font-size: 22px;
`;