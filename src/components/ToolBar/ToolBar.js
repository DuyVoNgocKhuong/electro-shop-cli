import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  SearchOutlined,
  RetweetOutlined,
  HeartOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { ReactComponent as Svg } from "../../asset/logo.svg";
import { Input, Select, Button, Popover, Drawer, Dropdown, Menu } from "antd";
import "./toolBar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MiniCart from "../MiniCart/MiniCart";
import AllCategories from "../AllCategories/AllCategories";

const { Option } = Select;
const ToolBar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [amount, setAmount] = useState("");

  const cartItems = useSelector((state) => state.productReducer.cart);
  const category = useSelector((state) => state.productReducer.category);
  //laod price and amount of items
  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((acc, val) => acc + val.retailPrice * val.quantity, 0)
    );
    setAmount(cartItems.length);
  }, [cartItems]);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onSearch = (values) => {
    console.log(values);
  };

  const selectAfter = (
    <Select
      defaultValue="All categories"
      onChange={(value) => setSelect(value)}
      className="select-after"
    >
      {category.map((cat) => (
        <Option value={cat._id} key={cat._id}>
          {cat.name}
        </Option>
      ))}
    </Select>
  );
  const [state, setState] = useState({ visible: false });
  const handleVisibleChange = (flag) => {
    setState({ visible: flag });
  };
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setState({ visible: false });
    }
  };

  const cart = (
    <div className="haiz" style={{ width: "330px" }}>
      {cartItems.length < 1 ? (
        <Menu
          style={{
            borderTop: "2px solid #fed700",
            maxHeight: "325px",
          }}
        >
          <Menu.Item style={{ margin: "20px" }}>No products in cart</Menu.Item>
        </Menu>
      ) : (
        <>
          <Menu
            style={{
              borderTop: "2px solid #fed700",
              maxHeight: "325px",
              overflowY: "scroll",
            }}
            onClick={handleMenuClick}
          >
            {cartItems.map((item) => (
              <MiniCart
                id={item._id}
                key={item._id}
                name={item.name}
                quantity={item.quantity}
                price={item.retailPrice}
                img={item.img}
              />
            ))}
          </Menu>
          <div className="jett">
            <Button>View cart</Button>
            <Button type="primary">Check out</Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="ToolBar">
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <Svg />
          </div>
          <div className="search">
            <div className="menu">
              <MenuOutlined onClick={showDrawer} />
            </div>
            <Input
              onChange={(e) => setInput(e.target.value)}
              addonAfter={selectAfter}
              defaultValue={input}
            />
            <Button
              onClick={() => {
                onSearch(input + select);
              }}
              type="primary"
            >
              <SearchOutlined style={{ color: "black" }} />
            </Button>
          </div>
          <div className="userAction">
            <Popover placement="bottom" content={"Compare"} trigger="hover">
              <RetweetOutlined />
            </Popover>
            <Popover placement="bottom" content={"Wishlist"} trigger="hover">
              <HeartOutlined />
            </Popover>
            <Popover placement="bottom" content={"My Acount"} trigger="hover">
              <UserOutlined />
            </Popover>
            <Popover placement="bottom" content={"Cart"} trigger="hover">
              <Dropdown
                overlay={cart}
                placement="bottomRight"
                trigger={["click"]}
                onVisibleChange={handleVisibleChange}
                visible={state.visible}
              >
                <div className="cartt">
                  <p>
                    <ShoppingOutlined />
                    <span className="zero">{amount}</span>
                  </p>
                  <p style={{ marginLeft: "10px" }}>${totalPrice}.00</p>
                </div>
              </Dropdown>
            </Popover>
          </div>
        </div>
      </div>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <AllCategories width={"100%"} />
      </Drawer>
    </>
  );
};

export default ToolBar;
