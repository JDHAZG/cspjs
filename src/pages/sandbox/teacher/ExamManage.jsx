import React, { useEffect, useState } from 'react'
import { Steps, Button, Form, Input, Select, message, notification } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import style from "./Exam.module.css";
import ExamName from '../../../components/examManage/ExamName';
import ExamArrangement from '../../../components/examManage/ExamArrangement';
import axios from 'axios';
// https://www.cnblogs.com/gxp69/p/7081859.html form表单提交后不刷新
const onSubmit = (e) => { 
  notification.info({
    message: `通知`,
    description:
      `已录入考生信息,请点击下一步`,
    placement:"bottomRight",
  });
 }
export default function ExamManage() {
  const [current, setCurrent] = useState(0);
  const [examineeNum, setExamineeNum] = useState(0)
  useEffect(() => {
    if(current===2)
    axios.get(`http://localhost:9000/parse`).then((res) => { 
      setExamineeNum(res.data.examineeNum);
     })
  }, [current])
  const handleNext = () => {
    setCurrent(current + 1);
  };
  const handlePrevious = () => {
    setCurrent(current - 1);
  };
  return (
    // <div>
    //   <form action='http://localhost:9000/upload' method="post" encType="multipart/form-data" target='nm_iframe'>
    //     <h2>考生信息上传</h2>
    //     <input type="file" name="logo"/>
    //     <input type="submit" value="提交"/>
    //   </form>
    //   <iframe title="id_iframe" name="nm_iframe" style={{display:'none'}}></iframe>
    // </div>
    <div>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title="考试管理"
        subTitle="考试发布与编排"
      />
      <Steps
        current={current}
        items={[
          {
            title: "考生信息",
            description: "提交考生信息",
          },
          {
            title: "考试名称",
            description: "选择或输入要创建的考试",
          },
          {
            title: "考场编排",
            description: "考场座位编排和准考证号生成",
          },
        ]}
      />
      <div style={{marginTop:"50px"}}>
        <div className={current === 0 ? "" : style.active}>
          {/* <Form name="basic" labelCol={{ span: 4 }} 
          wrapperCol={{ span: 20 }}>
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form> */}
          <div>
            <form action='http://localhost:9000/upload' method="post" encType="multipart/form-data" target='nm_iframe'>
              <input type="file" name="logo"/>
              <input type="submit" value="提交" onClick={onSubmit}/>
            </form>
            <iframe title="id_iframe" name="nm_iframe" style={{display:'none'}}></iframe>
          </div>
        </div>
        <div className={current === 1 ? "" : style.active}>
          <ExamName />
        </div>
        <div className={current === 2 ? "" : style.active}>
          <ExamArrangement current={current} examineeNum={examineeNum}/>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        {/* {current === 2 && (
          <span>
            <Button type="primary">确定,自动编排并生成准考证</Button>
          </span>
        )} */}
        {current < 2 && (
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        )}
        {current > 0 && <Button onClick={handlePrevious}>上一步</Button>}
      </div>
    </div>
  )
}
