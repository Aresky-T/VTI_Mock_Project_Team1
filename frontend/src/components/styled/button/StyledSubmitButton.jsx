import styled from "styled-components";

const StyledSubmitButton = styled.button`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
  font-weight: 550;
  font-size: 0.8rem;
  color: #ffffff !important;
  text-align: center;
  border: none;
  background-color: rgb(76, 76, 76) !important;
  padding: 16px !important;
  width: 100%;

  pointer-events: none;
  user-select: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  &:active {
    box-shadow: none;
  }

  &.active {
    background-color: #000 !important;
    pointer-events: all;
  }

  &.processing {
    cursor: not-allowed;
  }
`;

export default StyledSubmitButton;
