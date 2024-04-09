import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
const { TextArea } = Input;
export default function StudentInfo() {
  const [form] = Form.useForm();
  const [change, setChange] = useState(true);
  const personalInfo = JSON.parse(localStorage.getItem("token"));
  const updateInfo = () => { 
    form.validateFields().then((value) => { 
       axios.patch(`/users/${personalInfo.id}`,value)
       localStorage.setItem("token",JSON.stringify({...personalInfo,...value}))
       setChange(true)
     }).catch(() => {}) 
   }
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="username"
          label="姓名"
          initialValue={personalInfo.username}
          rules={[
            {
              required: true,
              message: "请输入您的姓名!",
            },
          ]}
        >
          <Input disabled={change} />
        </Form.Item>
        <Form.Item
          name="mail"
          label="邮箱"
          initialValue={personalInfo.mail}
          rules={[
            {
              required: true,
              message: "请输入您的电子邮箱!",
            },
          ]}
        >
          <Input disabled={change} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="性别"
          initialValue={personalInfo.gender}
          rules={[
            {
              required: true,
              message: "请输入您的性别!",
            },
          ]}
        >
          <Input disabled={change} />
        </Form.Item>
        <Form.Item
          name="school"
          label="学校"
          initialValue={personalInfo.school}
          rules={[
            {
              required: true,
              message: "请输入您的学校!",
            },
          ]}
        >
          <Input disabled={change} />
        </Form.Item>
        <Form.Item
          name="info"
          label="其他信息"
          initialValue={personalInfo.info}
          rules={[
            {
              required: true,
              message: "请补充其他信息!",
            },
          ]}
        >
          <TextArea
            rows={4}
            disabled={change}
          />
        </Form.Item>
      </Form>
      {change ? (
        <Button
          type="primary"
          onClick={() => {
            setChange(false);
          }}
        >
          更改信息
        </Button>
      ) : (
        <Button type="primary" onClick={updateInfo}>确认更改</Button>
      )}
    </div>
  );
}
