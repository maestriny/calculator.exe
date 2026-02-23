import styled from 'styled-components';

const DisplayFrame = styled.div`
  background: white;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDark};
  padding: 4px 8px;
  margin: 6px 2px 16px;
  font-size: 20px;
  text-align: right;
  font-family: 'ms_sans_serif', monospace;
  min-height: 24px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: inset 1px 1px 0px ${({ theme }) => theme.borderDarkest},
              inset -1px -1px 0px ${({ theme }) => theme.borderLight};
`;

function Display({ value }) {
  return <DisplayFrame>{value}</DisplayFrame>;
}

export default Display;
