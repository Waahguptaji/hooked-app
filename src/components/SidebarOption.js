import React from "react";
import styled from "styled-components";

function SidebarOption({ title, Icon }) {
  //here Icon is a component passing as prop
  return (
    <Container>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;

  color: grey;
  transition: 200ms color ease-in;

  &:hover {
    color: white;
  }

  .sidebarOption__icon {
    height: 40px;
    p {
      margin-top: 10px;
      margin-left: 20px;
      padding: 0.3rem;
      font-size: 14px;
    }
  }
`;

export default SidebarOption;
