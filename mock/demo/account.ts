import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultError } from '../_util';
import { ResultEnum } from '../../src/enums/httpEnum';

const userInfo = {
  name: '周子诚',
  userid: '00000001',
  email: 'CrazyPatrk@163.com',
  signature: '海纳百川，有容乃大',
  introduction: '',
  title: '交互专家',
  group: '某某某事业群－某某平台部－某某技术部－UED',
  tags: [],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  address: '四川省成都市成华区',
  phone: 'xxxxxxxxxxx',
};

export default [
  {
    url: '/basic-api/account/getAccountInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
  {
    url: '/basic-api/user/sessionTimeout',
    method: 'post',
    statusCode: 401,
    response: () => {
      return resultError();
    },
  },
  {
    url: '/basic-api/user/tokenExpired',
    method: 'post',
    statusCode: 200,
    response: () => {
      return resultError('Token Expired!', { code: ResultEnum.TIMEOUT as number });
    },
  },
] as MockMethod[];
