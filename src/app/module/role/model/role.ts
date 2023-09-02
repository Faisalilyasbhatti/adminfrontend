import { RoleType } from './roleType';
export class Role {
  public id: number;
	public code: string;
	public name: string;
	public type: number;
	public permissionVos: any[];
  public nscVos: any[];
  public roleTypeVo: RoleType;
  public createdDate: string;
  public updatedDate: string;
  public createdBy: any;
  public updatedBy: any;
}
