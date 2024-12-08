import styled from "styled-components";

const StyledTextarea = styled.textarea`
  /* Layout và kích thước */
  width: 100%;
  max-width: 100%;
  margin-block: 0.5rem;
  padding: 0.5rem 0.75rem;

  /* Định dạng văn bản */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.42em;
  letter-spacing: normal;
  text-transform: none;
  font-style: normal;
  font-feature-settings: normal;

  /* Giao diện & màu sắc */
  border: 1px solid #c9c9c9;
  outline: none;
  background-color: rgb(255, 255, 255);
  color: rgb(117, 117, 117);
  color: #000;

  /* Hiệu ứng chuyển đổi */
  transition: color 200ms ease-in, background 200ms ease-in,
    border 200ms ease-in;

  /* Các thuộc tính khác */
  line-break: auto;
  overflow-wrap: normal;
  overflow: auto;
  resize: none;

  /* Trạng thái khi focus */
  &:focus {
    border-color: rgb(51, 51, 51);
  }
`;

export default StyledTextarea;
