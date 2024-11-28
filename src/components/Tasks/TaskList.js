import React from "react";
import { Table, Tag, Button } from "antd";

const TaskList = () => {
  const data = [
    {
      key: "1",
      title: "Task 1",
      dueDate: "2024-11-30",
      status: "pending",
    },
    {
      key: "2",
      title: "Task 2",
      dueDate: "2024-12-01",
      status: "completed",
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log("Edit Task", record.key)}>
          Edit
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />;
};

export default TaskList;
