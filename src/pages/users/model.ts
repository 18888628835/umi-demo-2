const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
];
const model = {
  namespace: 'users',
  state: {},
  reducers: {
    getList(state, action) {
      return { listData: action.payload };
    },
  },
  effects: {
    *asyncGetData(action, effects) {
      const listData = yield Promise.resolve(data);
      //用 effects.put 把数据 推给 reducers
      yield effects.put({ type: 'getList', payload: listData });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'asyncGetData',
          });
        }
      });
    },
  },
};
export default model;
