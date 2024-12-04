import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
    background-color: #34495E;
    padding: 24px;
   

`;

export const CardContainer = styled.View`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: space-between;
    align-items: center;
    gap: 16px;
    max-height: 270px;

`;

export const LogoContainer = styled.View`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 16px;

`;

export const Logo = styled.Image.attrs({
    source: require('../../../assets/images/yobi-logo.png'),
  })`
    width: 72px;
    height: 72px;
  `;

export const PremiumPlanCard = styled.Image.attrs({
  source: require('../../../assets/images/premium-plan-card.png'),
})`
  width: 310.5px;
  height: 390px;
`;

  
export const Title = styled.Text`
    color: #FFFFFF;
    font-family:'Inter-SemiBold';
    font-size: 14px;
`;


export const Subtitle = styled.Text`
    width: 100%;
    color: #FFFFFF;
    font-family:'Inter-Regular';
    font-size: 14px;
    text-align: start;
    margin: -6px;
`;


export const AcessButtons = styled.View`
display: flex;
width: 310px;
height: 120px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 16px;
flex-shrink: 0;
`;

export const PremiumButton = styled.Text`

    display: flex;
    width: 320px;
    height: 52px;
    padding: 16px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 6px;
    background: #D7B377 ;
    color: #FFFFFF;
    text-align: center;
    font-family: 'Inter-Bold'; 
    font-size: 14px;
    margin-top: 20px;
   
`;


export const StandardButton = styled.Text`

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




export const InputWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const Text = styled.Text`
  color: #6B6572;
  font-family: 'Inter-SemiBold'; 
`;


