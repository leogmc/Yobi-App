import styled from 'styled-components/native';

export const AlertContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AlertBox = styled.View`
  width: 80%;
  padding: 20px;
  background-color: #BFE3D0;
  color:#2D6C4A;
  border-radius: 10px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

export const AlertMessage = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: 'Inter-Bold';
`;