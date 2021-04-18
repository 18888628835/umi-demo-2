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
    form.setFieldsValue(record);
  }, [visible]);
  const onOk = () => {
    form.submit();
  };
  return (
    <>
      <Modal
        visible={visible}
        onCancel={showModal}
        forceRender
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          initialValues={record}
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UseModal;
