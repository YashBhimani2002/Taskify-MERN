import React, { useState } from "react";
import { Form, Input, Button, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApiConnection } from "../Api/Api";

const Register = () => {
  const [shortName, setShortName] = useState(""); // To store initials
  const [profileColor, setProfileColor] = useState("#f56a00"); // Default color for profile background
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  })
  // Generate short name when First Name or Last Name changes
  const handleNameChange = (firstName, lastName) => {
    const initials =
      (firstName?.charAt(0) || "").toUpperCase() +
      (lastName?.charAt(0) || "").toUpperCase();
    setShortName(initials);
  };
  // Store form details in formData
  const handleInputChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const onFinish = async (values) => {
    try {
      const response = await registerApiConnection({ ...values, shortName, profileColor })
      console.log(response);
      if (response.status === 200) {
        setModalType("Success");
        setModalMessage(response.data.message);
        setModal2Open(true); // Open modal
      }
    } catch (error) {
      setModalType("Failure");
      setModalMessage(error.response.data.message);
      setModal2Open(true); // Open modal
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>

          {/* Profile Preview */}
          <div
            className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-2xl font-bold text-white rounded-full"
            style={{ backgroundColor: profileColor }}
          >
            {shortName || "?"}
          </div>

          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            {/* First Name Field */}
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter your first name!" }]}
            >
              <Input
                placeholder="Enter your first name"
                name="firstName"
                onChange={(e) => {
                  handleInputChange(e.target.value, e.target.name);
                  handleNameChange(e.target.value, formData.lastName || '')
                }
                }
              />
            </Form.Item>

            {/* Last Name Field */}
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter your last name!" }]}
            >
              <Input
                placeholder="Enter your last name"
                name="lastName"
                onChange={(e) => {
                  handleInputChange(e.target.value, e.target.name);
                  handleNameChange(formData.firstName || '', e.target.value)
                }}
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            {/* Profile Color Picker */}
            <Form.Item label="Profile Background Color">
              <Select
                defaultValue="#f56a00"
                className="w-full"
                onChange={(color) => setProfileColor(color)}
              >
                <Select.Option value="#f56a00">Orange</Select.Option>
                <Select.Option value="#7265e6">Purple</Select.Option>
                <Select.Option value="#00a2ae">Teal</Select.Option>
                <Select.Option value="#ff4d4f">Red</Select.Option>
                <Select.Option value="#52c41a">Green</Select.Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Register
              </Button>
            </Form.Item>
          </Form>

          {/* Navigation to Login */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Modal
        title={modalType}
        centered
        open={modal2Open}
        onOk={() =>{ setModal2Open(false); modalType==="Success" && navigate('/')}}
        onCancel={() => setModal2Open(false)}
        footer={[
          <Button type="primary" key="ok" onClick={() => setModal2Open(false)}>
            Ok
          </Button>,
        ]}
      >
        <p className="text-green-500">{modalMessage}</p>
      </Modal>
    </>
  );
};

export default Register;
