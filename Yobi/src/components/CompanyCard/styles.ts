import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.TouchableOpacity`
   
    display: flex;
    width: 100%;
    height: 150px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #FFFFFF;
    border: 2px solid #27AE60;
    border-radius: 6px;

`;

export const CompanyProfile = styled.View` 
    width: 120px;
    height: 120px;
    justify-content: center;
    align-items: center;
    background-color: #27AE60;
    border-radius: 6px;
    margin: 10px;
`;

export const Logo = styled.View` 
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const CompanyInfo = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 90px;
    width: 180px;
    background-color: #FFFFFF;


  ${({ theme }) => width > 400 && css`
    height: 100px;
    width: 180px;
  `}

    
`;


export const Title = styled.Text`
  color: #34495E;
  font-family: 'Inter-Bold';
  font-size:20px;

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
  font-size:10px;
  `}

`;

export const Certification = styled.View`
    align-items: center;
    height: 20px;
    width: 86px;
    background-color: #27AE60;
    border-radius: 2px;
    
`;


export const ProfessionText = styled.Text`
  color: #FFFFFF;
  font-family: 'Inter-SemiBold';
  font-size:12px;

  ${({ theme }) => width > 400 && css`
  font-size:10px;
  `}

`;





