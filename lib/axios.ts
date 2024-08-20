import { ApiPath } from '@/common/constants';
import { ContentCategoryType, ContentType } from '@/types';
import axios, { AxiosResponse } from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.BASE_URL,
});

export const postContent = async (data: ContentType) => {
  try {
    const response = await axiosApi.post(ApiPath.Content, data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const postCategoryFetcher = (url: string) =>
  axiosApi
    .get(url)
    .then((response: AxiosResponse<ContentCategoryType[]>) => response.data);
