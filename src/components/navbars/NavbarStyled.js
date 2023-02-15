import styled from "styled-components";

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: 1317px) {
    width: 95%;
  }
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
  @media screen and (max-width: 839px) {
    display: none;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  @media screen and (max-width: 839px) {
    display: none;
  }
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

export const MenuListDrop = styled.ul`
  padding: 0;
  list-style-type: none;
  /* width: 100vw;
  height: 100vh; */
  /* padding-top: 125px; */
`;

export const NavbarDropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f5f6fa;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MenuItmeDrop = styled.li`
  padding: 10px 0;
  transition-delay: 2s;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0;
`;

export const XWrapper = styled.div`
  position: absolute;
  top: 20px;
  cursor: pointer;
  right: 20px;
`;
