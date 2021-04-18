import { EditName, getRemote } from './service';

const model = {
  namespace: 'login',
  state: {},
  reducers: {
    getList(state, action) {
      return { listData: action.payload };
    },
  },
  effects: {
    *asyncGetData(action, effects) {
      const { data } = yield effects.call(getRemote);
      //用 effects.put 把数据 推给 reducers
      yield effects.put({ type: 'getList', payload: data });
    },
    *asyncEditName({ payload }, effects) {
      //这里的 payload 是页面传过来的数据{id:xxx,payload:{name:xxx}}
      yield effects.call(EditName, payload.id, payload);
      //为了让页面渲染所以重新 put 一个请求，让页面再发一次请求获取数据
      yield effects.put({ type: 'asyncGetData' });
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
