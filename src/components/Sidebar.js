import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useStateValue } from "../utils/StateProvider";
import styled from "styled-components";
import Playlists from "./Playlists";

function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();
  return (
    <Container>
      <img className="sidebar__logo" src="/images/logo.png" alt="logo"></img>
      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption Icon={SearchIcon} title="Search" />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 230px;
  height: 85vh;
  color: white;
  background-color: #040404;
  .sidebar__title {
    margin-left: 10px;
    padding: 5px;
    font-size: 12px;
  }

  .sidebar__logo {
    object-fit: contain;
    width: 200px;
    height: 140px;
  }
  hr {
    border: 1px solid #282828;
    width: 90%;
    margin: 10px auto;
  }
`;
export default Sidebar;
