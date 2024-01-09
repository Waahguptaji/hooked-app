// import React from "react";
import Footer from "./Footer";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import Body from "./Body";
import styled from "styled-components";
import { useStateValue } from "../utils/StateProvider";
import Header from "./Header";

function Hooked({ spotify }) {
  const [{ token }, dispatch] = useStateValue();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false); //here we are setting the background of header row in body

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        img: data.images[0].url,
      };
      dispatch({ type: "SET_USER", userInfo: userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  return (
    <Container>
      <div className="hooked__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Header navBackground={navBackground} />
          <div className="body__contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="hooked_footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 90vh 10vh;
  .hooked__body {
    display: flex;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        //&-thumb targets the draggable scrolling handle of the scrollbar
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

export default Hooked;
