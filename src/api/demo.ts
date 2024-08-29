import request from '@/utils/request';

// 登录
export function getLogin() {
  return request({
    hideLoading: true,
    url: '/h5/partner/auth',
    method: 'post',
  });
}
