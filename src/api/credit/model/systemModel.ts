import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type ApplyParams = BasicPageParams & {
  name?: string;
};

export type UserParams = BasicPageParams & {
  gender?: string;
  phone?: string;
};

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface UserListItem {
  id: string;
  name: string;
  idCard: string;
  gender: string;
  age: number;
  phone: string;
  applyAmount: string;
  createTime: string;
  status: number;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type UserListGetResultModel = BasicFetchResult<UserListItem>;
