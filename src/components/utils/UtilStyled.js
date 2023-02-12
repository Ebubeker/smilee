import styled from "styled-components";

export const CardLayout = styled.div`
  position: ${(props) => (props.position ? props.position : "normal")};
  background-color: ${(props) => (props.color ? props.color : "#455966")};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;
