import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
   
    display: flex;
    width: 100%;
    height: 100px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: #FFFFFF;
    border: 2px solid #D7B377;
    border-radius: 6px;

    ${({ theme }) => width > 400 && css`
    height: 110px;
  `}

`;


export const WorkerProfile = styled.View` 
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #F2F2F2;
    border-radius: 50%;
    margin: 10px;

`;

export const Logo = styled.View` 
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const WorkerInfo = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 90px;
    width: 185px;
    background-color: #FFFFFF;

    
`;

export const StoreInfo = styled.View`
    height: 54px;
    width: 138px;
    background-color: #FFFFFF;
    border-radius: 6px;
    
`;

export const Title = styled.Text`
  color: #D7B377;
  font-family: 'Inter-Bold';
  font-size:16px;

  ${({ theme }) => width > 400 && css`
    font-size: 14px;
    `}

`;

export const Button = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    height: 28px;
`;

export const Subtitle = styled.Text`
  color: #34495E;
  font-family: 'Inter-SemiBold';
  font-size:14px;

  ${({ theme }) => width > 400 && css`
    font-size: 10px;
    `}

`;

export const Profession = styled.View`
    align-items: center;
    height: 20px;
    width: 86px;
    background-color: #F2F2F2;
    border: 1px solid #b8b8b8;
    border-radius: 2px;
    
`;


export const ProfessionText = styled.Text`
  color: #34495E;
  font-family: 'Inter-SemiBold';
  font-size:12px;

  ${({ theme }) => width > 400 && css`
    font-size: 10px;
    `}

`;





