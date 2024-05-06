import React, { useState } from "react";
import { Select, Input, Space, Button, notification } from "antd";
import axios from "axios";
const options = [
  { value: "CSP-J", label: "CSP-J" },
  { value: "CSP-S", label: "CSP-S" },
];
export default function ExamName() {
  const [customize, setCustomize] = useState(false);
  const [examName, setExamName] = useState('')
  const handleSelectChange = (value) => {
    console.log(value)
    setExamName(value)
  };
  const handleInputChange = (e) => {
    console.log(e.target.value)
    setExamName(e.target.value)
  };
  const onSubmit = () => { 
    axios.get(`http://localhost:9000/examName?name=${examName}`).then((res) => { 
      notification.info({
        message: `通知`,
        description:
          `提交成功，请点击下一步`,
        placement:"bottomRight",
      });
      })
   }
  return (
    <div>
      <Space.Compact block>
        {customize ? (
          <Input placeholder="请输入考试名称" onChange={handleInputChange}/>
        ) : (
          <Select
            style={{
              width: "100%",
            }}
            placeholder="请输入考试名称"
            onChange={handleSelectChange}
            options={options}
          />
        )}
        {customize ? (
          <Button
            type="primary"
            onClick={() => {
              setCustomize(false);
            }}
          >
            选择考试名称
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setCustomize(true);
            }}
          >
            自定义考试名称
          </Button>
        )}
      </Space.Compact>
      <Button type="primary" onClick={onSubmit}>提交</Button>
    </div>
  );
}
