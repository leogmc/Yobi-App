import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const WorkerIcon = styled.Image.attrs({
    source: require('../../assets/images/worker.png'),
  })`
    width: 120px;
    height: 120px;
    margin: 16px;
  `;

export const Title = styled.Text`
    color: #34495E;
    font-family:'Inter-Bold';
    font-size: 16px;
    padding: 4px;

    ${({ theme }) => width > 400 && css`
    font-size: 12px;
  `}
`;

export const Subtitle = styled.Text`
    color: #34495E;
    font-family:'Inter-Regular';
    font-size: 16px;
    text-align: center;


    ${({ theme }) => width > 400 && css`
    font-size: 14px;
  `}
`;



export const Container = styled.TouchableOpacity`
    width: 150px;
    height: 270px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* background-color:#FCFCFC; */
    /* border: 1px solid #D1CBD7; */
    border-radius: 8px;
`;

export const UserCard = styled.View`
   display: flex;
    width: 120px;
    height: 120px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: #ffffff;
    border: 3px solid #34495E;
    border-radius: 6px;
`;




export const CreateTaskBtn = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    width: 56px;
    padding:5px;
    background-color:#8A5ED1;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`;

