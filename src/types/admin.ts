export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  companyId: {
    _id: string;
    name: string;
  };
  activeFlag: boolean;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserUpdateData {
  name: string;
  email: string;
  companyId: string;
}