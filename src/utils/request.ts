import { ref } from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ContentTypeEnum } from './httpEnum';

// 超文本传输协议
let href = ref('http:');
if (location.href.includes('https:')) {
  href.value = 'https:';
}

// 创建一个axios实例
const service = axios.create({
  baseURL: `${href.value}${import.meta.env.VITE_BASE_API as string}`,
  withCredentials: false, // 当跨域请求时发送cookie
  timeout: 15000, // 请求超时时间
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
}

interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

// request请求拦截器
service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (localStorage.getItem('z_token') && config.headers) {
      config.headers['Authorization'] = `Bearer `;
    }
    const contentType = config.headers?.['content-type'] || config.headers?.['Content-Type'];
    const data = config.data;
    if (config.method?.toLocaleUpperCase() == 'POST' && data) {
      if (ContentTypeEnum.FORM_DATA == contentType) {
        const fd = new FormData();
        Object.keys(data).forEach((key) => fd.append(key, data[key]));
        config.data = fd;
      } else if (ContentTypeEnum.FORM_URLENCODED == contentType) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// response相应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 1) {
      // 服务器访问出错了~
      return Promise.reject(res.message || 'code: 1');
    } else {
      return Promise.resolve(response);
    }
  },
  (error: Error) => {
    console.log(`err${error}`);
    return Promise.reject(error);
  },
);

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export default request;
