import React, { useState } from 'react';
import { connect } from 'umi';
import { Table } from 'antd';
import UseModal from './components/UseModal';

const Login = (props) => {
  //modal 框弹出隐藏
  const [visible, setVisible] = useState(false);
  //一排的数据
  const [record, setRecord] = useState<any>({});
  //控制 modal 框的 ok 键是否有异步效果
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(!visible);
  };
  const handlerRecord = (value) => {
    setRecord(value);
  };
  const onSubmit = (values) => {
    //我通过 columns里面 render的 取到了表单的数据record
    const { id } = record;
    //控制 model框 的 ok 键旋转效果
    setConfirmLoading(true);
    //异步只是为了让 ok 键旋转效果明显一点
    setTimeout(() => {
      //这里才是页面 dispatch 的逻辑
      props.dispatch({
        type: 'login/asyncEditName',
        payload: { id: id, ...values },
      });
      //设置回 false
      setConfirmLoading(false);
      //弹框消失
      showModal();
    }, 1000);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a
          onClick={() => {
            showModal();
            // 取到了表单的数据record
            handlerRecord(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'update_time',
      key: 'update_time',
      dataIndex: 'update_time',
    },
  ];
  return (
    <>
      {/* rowKey 用来消除页面报错问题 */}
      <Table columns={columns} dataSource={props.login.listData} rowKey="id" />
      <UseModal
        showModal={showModal}
        visible={visible}
        record={record}
        onSubmit={onSubmit}
        confirmLoading={confirmLoading}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};
export default connect(mapStateToProps)(Login);
