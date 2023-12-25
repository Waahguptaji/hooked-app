import React from "react";
import "./SidebarOption.css";

function SidebarOption({ title, Icon }) {
  //here Icon is a component passing as prop
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
