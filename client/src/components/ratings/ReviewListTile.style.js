import styled from 'styled-components';

const TileStyle = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
align-content: space-between;
justify-content: space-between;
flex: 1;
height: 300px;
border-style: solid;
`;

const CardSummary = styled.h4`
display: flex;
align-items: flex-start;
border-style: solid;
flex-wrap: wrap;
`;

const HelpfulButton = styled.button`
  font-family: poppins;
  background: none;
  font-size: 16px;
  border: none;
  padding: 0 10px 0 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const InteractiveLine = styled.div`
display: flex;
border: solid;
`;

const CardInfo = styled.div`
display: flex;
border-style: solid;
width: 100%;
justify-content: space-between;
`;

const Body = styled.div`
display: flex;
border-style: solid;
flex-wrap: wrap;
max-width: 100%;
`;

const OwnerResponse = styled.div`
border-style: solid;
background-color: lightgray;
width: calc(100% - 70px);
margin: 10px;
padding: 20px;
`;

export {
  CardSummary,
  HelpfulButton,
  OwnerResponse,
  Body,
  CardInfo,
  TileStyle,
  InteractiveLine,
};
