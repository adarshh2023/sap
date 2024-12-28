export interface Company {
  _id?: string;
  name: string;
  logoUrl: string;
  contactDetails: {
    email: string;
    phone: string;
    address: string;
  };
  settings: {
    aiIntegration: {
      enableAI: boolean;
      aiPolicies: string[];
    };
    compliance: {
      dataRetentionPolicy: string;
      userConductPolicy: string;
    };
  };
  activeFlag: boolean;
  ipAddress: string;
  deviceId: string;
  insertedBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  roles: string[];
  companyId: string;
}