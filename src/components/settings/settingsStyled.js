import styled from "styled-components";

export const BackgroundImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: absolute;

  top: -90px;
  left: 35px;

  border: 5px solid white;
`;

export const Container = styled.div`
  width: 50%;
  margin: auto;
  position: relative;
  z-index: 0;
`;

export const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Status = styled.div`
  width: 220px;
  display: flex;
  margin-top: 100px;
  justify-content: center;
`;

export const Info = styled.div`
  width: 60%;
`;

export const StatusInfo = styled.div`
  width: 73px;
`;

export const StatusCount = styled.p`
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin: 0;
`;

export const StatusLabel = styled.p`
  text-align: center;
  margin: 0;
  color: white;
  font-size: 13px;
`;

export const Name = styled.p`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const Body = styled.p`
  color: white;
`;

export const LogOutButton = styled.button`
  width: 100%;
  background-color: #c95149;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #d45b53;
  }
`;

export const Laydown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 7px 17px;
  border-radius: 10px;
  border: none;
  color: #556772;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #dcdcdc;
  }
`;

// Profile Edit

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.31);
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dialogue = styled.div`
  width: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
`;

export const DialogueHeader = styled.div``;

export const DialogueTitle = styled.p`
  font-size: 25px;
  margin: 0;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

export const Form = styled.form`
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 20px;
`;

export const Field = styled.div`
  margin-bottom: 15px;
`;

export const InputLabel = styled.label``;

export const TextArea = styled.textarea`
  display: block;
  background: #ddd;
  resize: none;
  width: 100%;
  width: calc(100% - 16px);
  padding: 8px;
  border-radius: 10px;
  border: none;
`;

export const Input = styled.input`
  display: block;
  background: #ddd;
  width: calc(100% - 16px);
  padding: 8px;
  border-radius: 10px;
  border: none;
  margin-top: 5px;
`;

export const Xmark = styled.p`
  position: absolute;
  top: -30px;
  right: -15px;
  background: white;
  padding: 7px 11px;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 7px;
  border-radius: 10px;
  border: none;
  background: #36454f;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #495a66;
  }
`;
