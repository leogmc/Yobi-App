import styled from "styled-components/native";

export const Logo = styled.Image.attrs({
    source: require('../../assets/images/yobi-logo.png'),
  })`
    width: 120px;
    height: 120px;
    margin: 8px;
  `;

export const InputForm = styled.TextInput`
    
    padding:16px;
    font-family: 'Inter-Regular';
    font-size: 14px;
    height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #FFFFFF;
    border-radius: 6px;
    padding-right: 40px;
    width: 100%;
    gap: 16px;
    color: #FFFFFF;

`;

export const Title = styled.Text`
    color: #FFFFFF;
    font-family:'Inter-Bold';
    font-size: 32px;
`;


export const FormContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content:center;
    padding: 24px;
    background-color:#34495E;
    color: #FFFFFF;
    gap: 16px;

`;

export const FormView = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 4px;
    margin-top: 20px;
    margin-bottom: 10px;

`;

export const NextButton = styled.Text`

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
    background: #FFFFFF ;
    color: #34495E;
    text-align: center;
    font-family: 'Inter-Bold'; 
    font-size: 14px;
    margin-top: 20px;
   
`;

export const PhotoPickerButton = styled.Text`

    display: flex;
    width: 100%;
    height: 52px;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 10px;
    border-radius: 6px;
    border: 2px solid #FCFCFC;
    background: #FFFFFF ;
    color: #34495E;
    text-align: center;
    padding-top: 10px;

   
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
    color: #FFFFFF;
    text-align: center;
    font-family: 'Inter-SemiBold';
    text-decoration: underline;
    font-size: 14px;
   
`;


export const Label = styled.Text`
    color: #FFFFFF;
    font-family: 'Inter-Regular';
    font-size: 16px;
    padding: 4px;
    align-self: flex-start;

`;

export const Text = styled.Text`
  color: #FFFFFF;
  font-family: 'Inter-SemiBold'; 
`;