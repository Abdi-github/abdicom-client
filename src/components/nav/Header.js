import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../Input-forms/SearchForm";
// import Badge from "@material-ui/core/Badge";
// import { withStyles } from "@material-ui/core/styles";
// import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const { SubMenu, Item } = Menu;

// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     right: -6,
//     top: 4,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: "0 4px",
//   },
// }))(Badge);

const Header = () => {
  const [current, setCurrent] = useState("home");

  const user = useSelector((state) => state.user);
  // console.log(user);

  const { email, token, role } = user;

  const cart = useSelector((state) => state.cart);

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: {},
    });
    history.push("/login");
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        {/* <Item key="shop">
          <Link to="/shop">
            <ShopOutlinedIcon fontSize={"small"} />
            <span>Shop</span>
          </Link>
        </Item> */}

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
        {/* <Item key="cart">
          <Link to="/cart">
            <StyledBadge badgeContent={cart.length} color="secondary">
              <ShoppingCartOutlinedIcon fontSize={"small"} />{" "}
            </StyledBadge>
            {cart.length === 0 ? (
              <span style={{ margin: "10px" }}>Cart</span>
            ) : (
              <span style={{ margin: "20px" }}>Cart</span>
            )}
          </Link>
        </Item> */}

        {!token ? (
          <>
            <Item
              key="register"
              icon={<UserAddOutlined />}
              className="float-right"
            >
              <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
          </>
        ) : (
          <SubMenu
            icon={<SettingOutlined />}
            title={email.split("@")[0]}
            className="float-right"
          >
            {token && role === "customer" && (
              <Item>
                <Link to="/user/dashboard">Dashboard</Link>
              </Item>
            )}

            {token && role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
        <span className="float-right p-1">
          <SearchForm />
        </span>
      </Menu>
    </>
  );
};

export default Header;
