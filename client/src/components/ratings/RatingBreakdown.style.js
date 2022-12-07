import styled from 'styled-components';

const StarChart = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  width: 300px;
`;

const RowFormat = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  width: 20%
`;

const ResetFilter = styled(StarButton)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;
`;

const GreenBar = styled.div`
  box-sizing: border-box;
  background-color: green;
  width: ${(p) => (p.inputWidth ? p.inputWidth : '25%')};
  margin-left: 5%;
  height: 20px;
`;

const AverageTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-right: 25px;
`;

const GrayBar = styled(GreenBar)`
  background-color: gray;
  margin-left: 0%;
`;
export {
  GrayBar,
  GreenBar,
  StarChart,
  RowFormat,
  StarButton,
  ResetFilter,
  AverageTitle,
};
