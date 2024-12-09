import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 56px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color:#FCFCFC;
    border: 1px solid #34495E;
    border-radius: 6px;
    
`;

export const InputTask = styled.TextInput`
    padding-left:16px;
    font-family: 'Inter-Regular';
    font-size: 14px;
    width: 80%
    
`

export const SearchTaskButton = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    width: 56px;
    padding:5px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`;

