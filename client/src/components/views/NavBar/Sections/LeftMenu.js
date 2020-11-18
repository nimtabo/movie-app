import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="favorite">
        <NavLink to="/favorite">Favorites</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
