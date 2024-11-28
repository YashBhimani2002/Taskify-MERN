import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button, Checkbox, Typography } from "antd";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const TaskCreation = () => {
  const [isPriorityEnabled, setIsPriorityEnabled] = useState(false);
  const [priorityColor, setPriorityColor] = useState("");

  const handlePriorityChange = (color) => {
    setPriorityColor(color);
  };

  const onFinish = (values) => {
    console.log("Task Created: ", values);
    console.log("Selected Priority Color: ", priorityColor);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <Title level={3}>Create Task</Title>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        {/* Due Date */}
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select a due date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Set time to midnight
              return current && current < today;
            }}
          />
        </Form.Item>



        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the task description!" },
          ]}
        >
          <TextArea placeholder="Enter task description" rows={4} />
        </Form.Item>

        {/* State */}
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please select the task state!" }]}
        >
          <Select placeholder="Select task state">
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>

        {/* Priority Checkbox */}
        <Form.Item name="enablePriority" valuePropName="checked">
          <Checkbox
            checked={isPriorityEnabled}
            onChange={(e) => setIsPriorityEnabled(e.target.checked)}
          >
            Enable Priority
          </Checkbox>
        </Form.Item>

        {/* Priority Buttons */}
        {isPriorityEnabled && (
          <div className="flex gap-2 mb-4">
            <Button
              type={priorityColor === "red" ? "primary" : "default"}
              style={{
                backgroundColor: priorityColor === "red" ? "red" : "",
                color: priorityColor === "red" ? "white" : "",
              }}
              onClick={() => handlePriorityChange("red")}
            >
              High
            </Button>
            <Button
              type={priorityColor === "orange" ? "primary" : "default"}
              style={{
                backgroundColor: priorityColor === "orange" ? "orange" : "",
                color: priorityColor === "orange" ? "white" : "",
              }}
              onClick={() => handlePriorityChange("orange")}
            >
              Medium
            </Button>
            <Button
              type={priorityColor === "green" ? "primary" : "default"}
              style={{
                backgroundColor: priorityColor === "green" ? "green" : "",
                color: priorityColor === "green" ? "white" : "",
              }}
              onClick={() => handlePriorityChange("green")}
            >
              Low
            </Button>
          </div>
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskCreation;
