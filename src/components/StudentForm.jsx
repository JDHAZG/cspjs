import React,{forwardRef} from 'react'
import {Form,Input} from 'antd'
const { TextArea } = Input;
const StudentForm=forwardRef((props,ref)=> {//子组件（UserForm）向父组件（UserList）传递参数方法
    return (
    <Form
          layout="vertical"
          ref={ref}
        >
          <Form.Item
            name="username"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入您的姓名!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="组别"
            rules={[
              {
                required: true,
                message: '请输入您的组别!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="AuthenticationLanguage"
            label="认证语言"
            rules={[
              {
                required: true,
                message: '请输入您的认证语言!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="level"
            label="分级"
            rules={[
              {
                required: true,
                message: '请输入您的分级!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[
              {
                required: true,
                message: '请输入您的性别!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="grade"
            label="年级"
            rules={[
              {
                required: true,
                message: '请输入您的年级!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="school"
            label="学校"
            rules={[
              {
                required: true,
                message: '请输入您的学校!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="info"
            label="其他信息"
            rules={[
              {
                required: true,
                message: '请补充其他信息!',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
  )
})
export default StudentForm;
