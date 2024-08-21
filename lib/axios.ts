import { ApiPath } from '@/common/constants';
import { ContentCategoryType, ContentType } from '@/types';
import axios, { AxiosResponse } from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.BASE_URL,
});

// 記事内容をDBに登録するAPI
export const postContent = async (data: ContentType): Promise<boolean> => {
  try {
    const response = await axiosApi.post(ApiPath.Content, data);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 記事カテゴリー一覧を取得するAPI
export const postCategoryFetcher = (url: string) =>
  axiosApi
    .get(url)
    .then((response: AxiosResponse<ContentCategoryType[]>) => response.data);
