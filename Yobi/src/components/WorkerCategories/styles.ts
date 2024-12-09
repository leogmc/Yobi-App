import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    border-radius: 6px;
    gap: 2px;
    
`;

export const CategoryBox = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #34495E;
    height: 90px;
    width: 75px;
    text-align: center;
    border-radius: 6px;
    margin: 4px;

`;

export const CategoryIcon = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-align: center;
    background-color: #FFFFFF;
    height: 48px;
    width: 48px;
    border-radius: 6px;
`;

export const CategoryText = styled.Text`
    color: #FFFFFF;
    font-family:'Inter-Regular';
    font-size: 12px;
    margin: 4px;

    ${({ theme }) => width > 400 && css`
    font-size: 9px;
    `}
`;

export const ProfilePhoto = styled.Image`
    color: #6C6C6C;
`;

export const Title = styled.Text`
    color: #34495E;
    font-family:'Inter-Bold';
    font-size: 20px;
    margin: 8px 0px;

`;
