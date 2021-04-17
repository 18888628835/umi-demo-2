import React from 'react';
import { connect } from 'umi';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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

const Login = (props) => {
  return <Table columns={columns} dataSource={props.login.listData} />;
};
const mapStateToProps = (state) => {
  const { login } = state;
  return { login };
};
export default connect(mapStateToProps)(Login);
