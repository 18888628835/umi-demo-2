import axios from 'axios';
export async function getRemote(params) {
  const { data } = await axios
    .get('http://public-api-v1.aspirantzhang.com/users')
    .then(null, (error) => {
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
    throw new Error(error);
  });
}
