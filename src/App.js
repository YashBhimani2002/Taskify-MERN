import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Layout/Navbar"
import Sidebar from "./components/Layout/Sidebar";
import TaskList from "./components/Tasks/TaskList";
import TaskCreation from "./components/Tasks/TaskCreation";
const { Content } = Layout;
function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       {/* Default route to display Login page */}

    //     </Routes>
    //   </div>
    // </Router>
    <Router >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
        <Navbar />
      <Layout className="h-screen ">
        <Sidebar />
        <Layout >
          <Content style={{ padding: "24px", background: "#f0f2f5"}}>
            <Routes>
            
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList/>} />
              <Route path="/create-task" element={<TaskCreation/>} />
              <Route path="/priority-tasks" element={<div></div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
