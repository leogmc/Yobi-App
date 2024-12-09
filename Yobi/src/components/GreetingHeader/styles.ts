import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    height: 56px;
    align-items: center;
    justify-content: space-between;
    margin: 16px 8px;
`;

export const Greeting = styled.Text`
    color: #34495E;
    font-family:'Inter-Bold';
    font-size: 16px;

`;

export const SubGreeting = styled.Text`
    color: #6C6C6C;
    font-family:'Inter-Regular';
    font-size: 14px;
    text-align: start;
`;

export const Greetings = styled.View` 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
`;


export const ProfilePhoto = styled.View` 
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #E1E1E1;
    border-radius: 50%;
    margin: 16px;
`;