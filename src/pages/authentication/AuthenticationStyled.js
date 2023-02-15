import styled from "styled-components";

export const Title = styled.p`
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

export const Card = styled.div`
  width: 400px;
  background-color: #232833;
  padding: 40px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 609px) {
    width: 300px;
    padding: 25px;
  }

  @media screen and (max-width: 359px) {
    width: 200px;
    padding: 25px;
  }
`;

export const Input = styled.input`
  color: white;
  border-color: white;
  width: calc(100% - 20px);
  padding: 5px 10px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  margin-top: 20px;
  border-bottom: 1px white solid;
  &::placeholder {
    color: #bbb;
  }
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    border-radius: 4px;
    margin-right: 2px;
    opacity: 0.6;
    filter: invert(0.8);
  }
  @media screen and (max-width: 609px) {
    margin-top: 12px;
  }
`;

export const Text = styled.p`
  color: white;
  margin: 0;
  margin-top: 20px;
`;

export const Button = styled.button`
  background: white;
  color: black;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
`;

export const Error = styled.p`
  background: #b01e2d;
  padding: 10px;
  margin: 0;
  margin-top: 20px;
  width: calc(100% - 20px);
  color: white;
  border-radius: 10px;
`;

export const Select = styled.select`
  color: white;
  border-color: white;
  width: 100%;
  padding: 5px 10px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  margin-top: 20px;
  border-bottom: 1px white solid;
  &::placeholder {
    color: #bbb;
  }
`;

export const Form = styled.form``;
