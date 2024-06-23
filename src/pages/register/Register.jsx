import React, { useState } from "react";
import { Form, Button, Input, Radio,notification,message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.css";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(2)
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setRoleId(e.target.value);
  };
  const onFinish = (values) => {
    // console.log(values,roleId)
    if(values.password===values.passwordCheck)
    axios.post('/users',{
      "username":values.username,
      "password":values.password,
      "roleId":roleId,
      "default":true,
      "info":"待填写",
      "roleState":true,
      "id":0
     }).then((res) => { 
      navigate("/login")
      notification.info({
        message: `通知`,
        description:
          `注册成功！`,
        placement:"bottomRight",
      });
      })
    else
    message.error("两次密码输入不一致！")
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
          <Radio.Group style={{color:"white"}} onChange={onChange} value={roleId}>
            <Radio value={2} style={{color:"white"}} defaultChecked={true}>教师</Radio>
            <Radio value={3} style={{color:"white"}}>学生</Radio>
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
          <Form.Item
            name="passwordCheck"
            rules={[{ required: true, message: "Please input your Password again!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password again"
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
