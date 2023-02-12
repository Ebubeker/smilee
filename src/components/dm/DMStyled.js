import styled from "styled-components";

export const Box = styled.div`
  width: 32%;
`;

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserContext = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CommentorProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const Name = styled.p`
  cursor: pointer;

  font-size: 20px;
  color: white;
  font-weight: 500;
  margin: 0;
`;

export const Status = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.status};
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
  margin: 0;
  text-align: center;
  margin-bottom: 20px;
`;

export const TransparentBack = styled.div`
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100vw - 20px;
  height: 100vh; */
`;

export const PopupBox = styled.div`
  position: fixed;
  right: 230px;
  bottom: 0;
  width: 400px;
  height: 500px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #455966;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid #33353b33;
  padding-bottom: 10px;
`;

export const Footer = styled.div`
  border-top: 0.5px solid #33353b33;
  padding-top: 10px;
`;

export const Messages = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  /* text-align: center; */
`;

export const MessageFlexer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.sender ? "end" : "start")};
`;

export const Message = styled.p`
  margin: 0;
  padding: 5px;
  max-width: 170px;
  border-radius: 10px;
  margin: 5px 0;
  background: ${(props) => (props.sender ? "#6477de" : "gray")};
`;
