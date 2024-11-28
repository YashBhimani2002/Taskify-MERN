import React from "react";
import { Layout, Menu } from "antd";
import { UnorderedListOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Sider
    className="fix l-[0] r-[0] bg-[#001529]"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => {
          if (key === "1") navigate("/tasks");
          else if (key === "2") navigate("/create-task");
          else if (key === "3") navigate("/priority-tasks");
        }}
      >
        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
          All Tasks
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          Create Task
        </Menu.Item>
        <Menu.Item key="3" icon={<StarOutlined />}>
          Priority Tasks
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
