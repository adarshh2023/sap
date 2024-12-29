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
  userCount?: number;
  insertedBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}