import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import authConfig from '../../config/auth'; // Assuming auth configuration is stored here
import { atom, useRecoilState } from 'recoil';
import type { Actions } from './types';

type Auth = {
  user: string | undefined;
  isLoading: boolean;
  error: string | undefined;
  token: string | undefined;
};
const authState = atom<Auth>({
  key: 'authState',
  default: {
    user: undefined,
    isLoading: false,
    error: undefined,
    token: undefined,
  },
});

export const useAuth = (): [Auth, Actions] => {
  const [auth, setAuth] = useRecoilState(authState);
  const login = async (username: string, password: string) => {
    setAuth((prevState: Auth) => ({ ...prevState, isLoading: true, error: undefined }));

    const client = new CognitoIdentityProviderClient({ region: authConfig.region });
    const input: InitiateAuthCommandInput = {
      AuthFlow: authConfig.AuthFlow,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: authConfig.ClientId,
    };
    const command = new InitiateAuthCommand(input);

    try {
      const response = await client.send(command);
      setAuth((prevState: Auth) => ({
        ...prevState,
        user: response.AuthenticationResult?.IdToken, // Simplified assumption
        token: response.AuthenticationResult?.IdToken,
        isLoading: false,
      }));
    } catch (error) {
      let message = 'An unexpected error occurred';
      if (error instanceof Error) {
        // Checks if it's an Error object
        message = error.message;
      }
      setAuth((prevState: Auth) => ({
        ...prevState,
        isLoading: false,
        error: message,
      }));
      console.error('Authentication failed', error);
    }
  };

  return [auth, { login }];
};
