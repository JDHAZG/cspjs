import React, { useEffect,useRef,useState } from 'react'
import axios from 'axios'
import { Table,Button,Modal } from 'antd'
import {EditOutlined} from '@ant-design/icons'
import StudentForm from '../../../components/StudentForm'
// import { useNavigate } from 'react-router';
export default function StudentMange() {
  const [studentInfo, setStudentInfo] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [current, setCurrent] = useState(null)
  const updateForm = useRef(null)
  useEffect(() => {
    axios.get(`/users?roleId=3`).then((res) => { 
      setStudentInfo(res.data);
     })
  }, [])
  const columns = [
    {
      title: '学生姓名',
      dataIndex: 'username'
    },
    {
      title: '组别',
      dataIndex:'group'
    },
    {
      title: '认证语言',
      dataIndex:'AuthenticationLanguage'
    },
    {
      title: '分级',
      dataIndex:'level'
    },
    {
      title: '性别',
      dataIndex:'gender'
    },
    {
      title: '年纪',
      dataIndex:'grade'
    },
    {
      title: '学校',
      dataIndex:'school'
    },
    {
      title: '其他信息',
      dataIndex: 'info',
    },
    {
      title: '操作',
      render: (item) => { 
        return (
          <div>
            <Button type="primary" shape="circle" icon={<EditOutlined/>}
            onClick={() => { handleUpdate(item) }}/>
          </div>
        )
       }
    },
  ]
  const handleUpdate = (item) => {
    setIsUpdate(true);
    console.log(item);
    setTimeout(() => { //setTimeout专治不同步！
      updateForm.current.setFieldsValue(item); //被动赋值，无法赋给Form value值
     },0)
     setCurrent(item);
  }
  const handleOk = () => {
    updateForm.current.validateFields().then((value) => { 
      console.log(value);
      setIsUpdate(false)
      //将后台数据同步至前端
      setStudentInfo(studentInfo.map((item) => { 
        if(item.id===current.id){
          return {
            ...item,
            ...value,
          }
        }
        return item;
       }))
       axios.patch(`/users/${current.id}`,value)
     }).catch(() => {}) 
  }

  const handleCancel = () => {
    setIsUpdate(false);
  };
  return (
    <div>
      <Table dataSource={studentInfo} columns={columns} pagination={{pageSize:5}}
      rowKey={item=>item.id}/>
      <Modal
        open={isUpdate}
        title="考生信息更正"
        okText="更新"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <StudentForm ref={updateForm} />
      </Modal>
    </div>
  )
}
