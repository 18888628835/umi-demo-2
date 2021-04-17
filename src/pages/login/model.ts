import { getRemote } from './service';

const model = {
  namespace: 'login',
  state: {},
  reducers: {
    getList(state, action) {
      console.log(action.payload);
      return { listData: action.payload };
    },
  },
  effects: {
    *asyncGetData(action, effects) {
      const { data } = yield effects.call(getRemote);
      //用 effects.put 把数据 推给 reducers
      yield effects.put({ type: 'getList', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/login') {
          dispatch({
            type: 'asyncGetData',
          });
        }
      });
    },
  },
};
export default model;
