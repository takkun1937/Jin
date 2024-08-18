import { PostCategoryType } from '@/types/api';
import axios, { AxiosResponse } from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.BASE_URL,
});

export const postCategoryFetcher = (url: string) =>
  axiosApi
    .get(url)
    .then((res: AxiosResponse<PostCategoryType[]>) =>
      res.data.map((resData) => resData.category)
    );
