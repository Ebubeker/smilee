import styled from "styled-components";

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

export const Brand = styled.p`
  font-weight: bold;
  font-size: 55px;
  color: white;
  margin: 0;
`;

export const SearchBar = styled.div`
  background-color: white;
  padding: 7px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  margin-right: 5px;
  border: none;
  outline: none;
  font-size: 14px;
  width: 250px;
`;

export const ListItem = styled.li``;

export const LinkItem = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 30px;
`;

export const Box = styled.div`
  background-color: #26343d;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  position: fixed;
  height: fit-content;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Avatar = styled.img`
  height: 33px;
  width: 33px;
  border-radius: 50%;
  object-fit: cover;
`;
