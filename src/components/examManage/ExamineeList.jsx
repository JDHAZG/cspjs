import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { useNavigate } from 'react-router';
export default function ExamineeList(props) {
  const examList = props.examList;
  const examName=props.examName
  const updateForm = useRef(null);
  const columns = [
    {
      title: "序号",
      dataIndex: "序号",
    },
    {
      title: "组别",
      dataIndex: "组别",
    },
    {
      title: "认证语言",
      dataIndex: "认证语言",
    },
    {
      title: "准考证号",
      dataIndex: "准考证号test",
    },
    {
      title: "学校",
      dataIndex: "更新学校",
    },
    {
      title: "考场",
      dataIndex: "考场",
    },
  ];
  return (
    <div>
      <h1>{examName}</h1>
      <Table
        dataSource={examList}
        columns={columns}
        pagination={{ pageSize: 20 }}
        showSizeChanger={false}
        rowKey={(item) => item.id}
        scroll={{
          y: 300,
        }}
      />
    </div>
  );
}
