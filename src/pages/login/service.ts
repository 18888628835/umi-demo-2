import axios from 'axios';
import { message } from 'antd';

function handlerError(error) {
  let info = '';
  const errorStatus = parseInt(error.response.status);
  switch (true) {
    case errorStatus >= 500:
      info = '服务器内部错误';
      break;
    case errorStatus >= 400:
      info = '浏览器错误';
      break;
    default:
      break;
  }
  message.error(info);
}

export async function getRemote(params) {
  const { data } = await axios
    .get('http://public-api-v1.aspirantzhang.com/users')
    .then(null, (error) => {
      handlerError(error);
      throw new Error(error);
    });
  return data;
}

export async function EditName(id, data) {
  await axios({
    url: `http://public-api-v1.aspirantzhang.com/users/${id}`,
    method: 'PUT',
    data: data,
  }).then(null, (error) => {
    handlerError(error);
    throw new Error(error);
  });
}
