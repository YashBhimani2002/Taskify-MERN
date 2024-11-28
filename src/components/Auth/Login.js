import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginApiConnection } from "../Api/Api";

const Login = () => {
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const onFinish = async (values) => {
    console.log("Login Data:", values);
    try {
      const response = await loginApiConnection(values);
      if (response.status === 200) {

      }
    } catch (error) {
      setModalType("Failure");
      setModalMessage(error.response.data.message);
      setModal2Open(true); // Open modal
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
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
                { min: 6, message: "Password must be at least 6 characters long!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>
          </Form>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register first
            </Link>
          </p>
        </div>
      </div>
      <Modal
        title={modalType}
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <p className="text-green-500">{modalMessage}</p>
      </Modal>
    </>
  );
};

export default Login;
