import styled from "styled-components/native";

export const Logo = styled.Image.attrs({
    source: require('../../assets/images/yobi-logo-variant.png'),
  })`
    width: 120px;
    height: 120px;
    margin: 8px;
  `;


export const FormContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content:center;
    gap: 8px;
    padding: 24px;

`;

export const InputForm = styled.TextInput`
    
    padding-left:16px;
    font-family: 'Inter-Regular';
    font-size: 14px;
    height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color:#FFFFFF;
    border: 2px solid #34495E;
    border-radius: 6px;
    padding-right: 40px;
    width: 100%;
    gap: 16px;   

`;

export const Title = styled.Text`
    color: #34495E;
    font-family:'Inter-Bold';
    font-size: 32px;
`;

export const Subtitle = styled.Text`
    width: 100%;
    color: #D7B377;
    font-family:'Inter-Regular';
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
`;



export const FormView = styled.View`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    flex-direction: column;
    gap: 2px;
    margin-top: 20px;
    margin-bottom: 10px;
  

`;

export const SubscribeButton = styled.Text`

    display: flex;
    width: 320px;
    height: 52px;
    padding: 12px 100px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 2px solid #FCFCFC;
    background: #34495E;
    color: #FFF;
    text-align: center;
    font-family: 'Inter-Bold'; 
    font-size: 14px;
    margin-top: 20px;
   
`;


export const ForgotButton = styled.Text`

    display: flex;
    width: 320px;
    height: 52px;
    padding: 10px 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: #34495E;
    text-align: center;
    font-family: 'Inter-SemiBold';
    text-decoration: underline;
    font-size: 14px;
   
`;