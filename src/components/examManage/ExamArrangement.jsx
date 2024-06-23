import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
const { TextArea } = Input;
export default function ExamArrangement(props) {
  const [form] = Form.useForm();
  const getExamList=props.getExamList
  form.setFieldsValue({
    examineeNum: props.examineeNum,
  });
  const personalInfo = JSON.parse(localStorage.getItem("token"));
  //   useEffect(() => {
  //     if(current===2)
  //     axios.get(`http://localhost:9000/parse`).then((res) => {
  //       setExamineeNum(res.data);
  //      })
  //   }, [current])
  const updateInfo = () => {
    form
      .validateFields()
      .then((value) => {
        axios.get(
          `http://localhost:9000/seatArrangement?prefix=${value.prefix}&placeholder=${value.placeholder}&examineeNum=${value.examineeNum}&seatsNum=${value.seatsNum}`
        ).then((res) => { 
          // console.log(res)
          getExamList(res.data.newStuInfo)
         })
      })
      .catch(() => {});
  };
  return (
    <div>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="prefix"
          label="准考证前缀"
          rules={[
            {
              required: true,
              message: "请输入准考证前缀!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="placeholder"
          label="考场号占位"
          rules={[
            {
              required: true,
              message: "请输入考场号占位!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="examineeNum"
          label="考生数量"
          rules={[
            {
              required: true,
              message: "请输入考生数量!",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="seatsNum"
          label="每个考场座位数"
          rules={[
            {
              required: true,
              message: "请输入考场座位数!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      <span>
        <Button type="primary" onClick={updateInfo}>
          确定，自动编排并生成准考证
        </Button>
      </span>
    </div>
  );
}
