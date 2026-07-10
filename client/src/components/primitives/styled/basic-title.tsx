import styled from "@emotion/styled";

const BasicTitle = styled.h3`
  padding: 0px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin: 0.7em 0;

  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;

export { BasicTitle };
