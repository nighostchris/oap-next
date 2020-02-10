import axios from 'axios';

export default (_req: any, res: any) => {
  axios.get('https://ust-courses.now.sh/api/courses').then((axiosRes) => {
    res.json(axiosRes.data);
  });
};
