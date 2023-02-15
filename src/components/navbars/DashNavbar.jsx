import React, { useState, useEffect } from "react";
import {
  Navbar,
  Brand,
  SearchBar,
  MenuList,
  Input,
  ListItem,
  Box,
  Avatar,
  MenuListDrop,
  MenuItmeDrop,
  NavbarDropWrapper,
  XWrapper,
} from "./NavbarStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faBell,
  faGear,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DashNavbar = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
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
        {windowSize[0] < 839 && (
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setDropdownStatus(!dropdownStatus)}
            style={{ color: "white", fontSize: "35px", cursor: "pointer" }}
          />
        )}
        {dropdownStatus && windowSize[0] < 839 && (
          <NavbarDropWrapper>
            <XWrapper>
              <FontAwesomeIcon
                style={{ fontWeight: "bold", fontSize: "35px" }}
                icon={faXmark}
                onClick={() => setDropdownStatus(false)}
              />
            </XWrapper>
            <MenuListDrop>
              <MenuItmeDrop>
                <Link
                  to="/"
                  onClick={() => setDropdownStatus(false)}
                  style={{ textDecoration: "none", color: "#111" }}
                >
                  Home
                </Link>
              </MenuItmeDrop>
              <MenuItmeDrop>
                <Link
                  to="/settings"
                  onClick={() => setDropdownStatus(false)}
                  style={{ textDecoration: "none", color: "#111" }}
                >
                  Settings
                </Link>
              </MenuItmeDrop>
              <MenuItmeDrop>
                <Link
                  to="/notifications"
                  onClick={() => setDropdownStatus(false)}
                  style={{ textDecoration: "none", color: "#111" }}
                >
                  Notifications
                </Link>
              </MenuItmeDrop>
              <MenuItmeDrop>
                <Link
                  to="/myProfile"
                  onClick={() => setDropdownStatus(false)}
                  style={{ textDecoration: "none", color: "#111" }}
                >
                  Profile
                </Link>
              </MenuItmeDrop>
            </MenuListDrop>
          </NavbarDropWrapper>
        )}
      </Navbar>
    </Box>
  );
};

export default DashNavbar;
