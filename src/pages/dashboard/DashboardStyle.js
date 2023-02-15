import styled from "styled-components";

export const Box = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  margin-top: 150px;
  justify-content: space-between;
  @media screen and (max-width: 1317px) {
    width: 95%;
  }
`;

export const BoxContainer = styled.div`
  width: 32%;
  @media screen and (max-width: 1093px) {
    width: 49%;
  }

  @media screen and (max-width: 1093px) {
    width: 100%;
    display: ${(props) => (props.dm === true ? "none" : "block")};
  }
`;

export const BoxContainerWrapper = styled.div`
  width: 32%;
  @media screen and (max-width: 1093px) {
    display: none;
  }
`;
