import { ApiPath } from '@/common/constants';
import { GetContentCategoryResponse, PostContentRequest } from '@/types/api';
import axios, { AxiosResponse } from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 記事内容をDBに登録するAPI
export const postContent = async (data: PostContentRequest) => {
  return await axiosApi.post(ApiPath.Content, data);
};

// 記事カテゴリー一覧を取得するAPI
export const contentCategoryFetcher = (url: string) =>
  axiosApi
    .get(url)
    .then(
      (response: AxiosResponse<GetContentCategoryResponse>) => response.data
    );
