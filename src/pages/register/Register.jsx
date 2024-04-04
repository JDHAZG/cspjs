import React from "react";
import { Form, Button, Input, message, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.css";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .get(
        `/users?username=${
          //链接处不要随意换行
          values.username
        }&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.length === 0) {
          message.error("用户名或密码不匹配");
        } else {
          localStorage.removeItem("token");
          setTimeout(() => {
            localStorage.setItem("token", JSON.stringify(res.data[0]));
          }, 0);
          setTimeout(() => {
            navigate("/");
          }, 0);
        }
      });
  };
  return (
    <div
      style={{
        background: "rgba(100,100,100,0.5)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="formContainer">
        <div className="registertitle">CSP-J/S考务系统</div>
        <Form name="normal_register" className="register-form" onFinish={onFinish}>
          <Radio.Group style={{color:"white"}}>
            <Radio value={1} style={{color:"white"}}>教师</Radio>
            <Radio value={2} style={{color:"white"}}>学生</Radio>
          </Radio.Group>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                注册
              </Button>
            </Form.Item>
            <Form.Item style={{ color: "white" }}>
              已有账号？
              <Button
                type="primary"
                className="register-form-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                登录
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
