import axios from 'axios';
export async function getRemote(params) {
  const { data } = await axios
    .get('http://public-api-v1.aspirantzhang.com/users')
    .then(null, (error) => {
      throw new Error(error);
    });
  return data;
}
