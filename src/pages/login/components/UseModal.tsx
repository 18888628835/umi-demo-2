import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';

interface UseModalProps {
  showModal: () => void;
  visible: boolean;
  record: any;
  onSubmit: (value) => void;
  confirmLoading: boolean;
}
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};
const UseModal: FC<UseModalProps> = (props) => {
  const { visible, showModal, record, onSubmit, confirmLoading } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    //ant-d 文档明文规定如果要修改表单的内容，需要写这句代码
    if (record) {
      form.setFieldsValue(record);
    } else {
      //在做 add 时，发现由于setFieldsValue 注入的关系，即使 record 为空，表单的数据并非空白，所以加入这句代码
      form.resetFields();
    }
  }, [visible]);
  const onOk = () => {
    form.submit();
  };
  return (
    <>
      <Modal
        //控制隐藏
        visible={visible}
        onCancel={showModal}
        //forceRender预渲染，ant-d 文档明文规定
        forceRender
        onOk={onOk}
        //异步效果的值
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          //注入表单中的初始值
          initialValues={record}
          //ant-d 文档明文规定写的
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            label="name"
            //这里的 name 会根据传进来的 record 值渲染input 框
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ message: 'Please input your name!' }]}
          >
            <Input readOnly />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UseModal;
