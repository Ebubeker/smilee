import React from "react";
import {
  Navbar,
  Brand,
  SearchBar,
  MenuList,
  Input,
  ListItem,
  Box,
  Avatar,
} from "./NavbarStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faBell,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DashNavbar = () => {
  return (
    <Box>
      <Navbar>
        <Brand>Smilee</Brand>
        <SearchBar>
          <Input type="text" placeholder="Search..." />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#26343d", cursor: "pointer" }}
          />
        </SearchBar>
        <MenuList>
          <ListItem>
            <Link style={{ marginLeft: "30px", fontSize: "25px" }} to="/main">
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ marginLeft: "30px", fontSize: "25px" }}
              to="/notifications"
            >
              <FontAwesomeIcon
                icon={faGear}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ marginLeft: "30px", fontSize: "25px" }}
              to="/settings"
            >
              <FontAwesomeIcon
                icon={faBell}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ marginLeft: "30px", fontSize: "25px" }}
              to="/myProfile"
            >
              <Avatar
                src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
                alt="idk"
              />
            </Link>
          </ListItem>
        </MenuList>
      </Navbar>
    </Box>
  );
};

export default DashNavbar;
