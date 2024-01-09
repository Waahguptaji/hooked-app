import React from "react";
import styled from "styled-components";
import { useStateValue } from "../utils/StateProvider";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaSearch } from "react-icons/fa";

function Header({ navBackground }) {
  const [{ userInfo }, dispatch] = useStateValue();

  return (
    <Container navBackground={navBackground}>
      <div className="header__left">
        <FaSearch />
        <input placeholder="Artists, Songs, or Podcasts " type="text" />
      </div>
      <div className="header__right">
        <a href="#">
          <Avatar className="avatar" src={userInfo?.img} alt={userInfo?.name} />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem 2rem 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .header__left {
    display: flex;
    align-items: center;
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    color: gray;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .header__right {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 2rem;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      .avatar {
        height: 25px;
        width: 25px;
      }
      span {
        color: white;
      }
    }
  }
`;

export default Header;
