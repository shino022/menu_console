import { AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';
const authConfig: { region: string; ClientId: string; AuthFlow: AuthFlowType } = {
  region: 'us-east-1',
  ClientId: 'ggb2ql4f7m4dki66882h7mhi1',
  AuthFlow: 'USER_PASSWORD_AUTH',
};

export default authConfig;
