import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate =useNavigate();
  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={()=>navigate("/")}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="flex justify-between items-center px-6 bg-blue-500">
      <div className="text-white text-lg font-bold">TASKIFY</div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar
          style={{
            backgroundColor: "#87d068",
            cursor: "pointer",
          }}
          size="large"
        >
          YB {/* Replace with dynamic initials */}
        </Avatar>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
