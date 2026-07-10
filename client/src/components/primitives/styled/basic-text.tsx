import styled from "@emotion/styled";

const BasicText = styled.div`
  padding: 0px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  min-height: 24px;
  width: 100%;

  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;

export { BasicText };
