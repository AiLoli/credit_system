import { UserListGetResultModel, UserParams } from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/credit/getUserList',
}
export const getUserList = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserList, params });
