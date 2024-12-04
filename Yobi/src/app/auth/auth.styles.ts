import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    align-items: center;
    gap: 200px;
    padding-top: 16px;

`;

export const LogoContainer = styled.View`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 16px;

`;

export const Logo = styled.Image.attrs({
    source: require('../../assets/images/yobi-logo-variant.png'),
  })`
    width: 120px;
    height: 120px;
  `;

  
export const Title = styled.Text`
    color: #34495E;
    font-family:'MontserratAlternates-BoldItalic';
    font-size: 100px;
`;


export const Subtitle = styled.Text`
    color: #27AE60;
    font-family:'MontserratAlternates-Regular';
    font-size: 18px;
`;

export const Label = styled.Text`
    color: #34495E;
    font-family: 'Inter-Regular';
    font-size: 16px;
    padding: 4px;
    align-self: flex-start;

`;


export const AcessButtons = styled.View`
display: flex;
width: 320px;
height: 120px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 16px;
flex-shrink: 0;
`;

export const LoginButton = styled.Text`

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
    border: 2px solid #34495E;
    background: #FCFCFC;
    color: #34495E;
    text-align: center;
    font-family: 'Inter-Bold'; 
    font-size: 14px;
    
`;


export const InputWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const Text = styled.Text`
  color: #6B6572;
  font-family: 'Inter-SemiBold'; 
`;


