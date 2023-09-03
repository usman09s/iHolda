import { LoginParameters, LoginResponse, SignUpResponse } from 'types/AuthTypes';
import wretch from 'wretch';

class ApiClass {
  externalApi;
  token = '';
  _headers = {
    'Agent-Signature': 'mobile/iB+44',
  };

  constructor() {
    this.externalApi = wretch('https://holda-backend-muyrh.ondigitalocean.app/api/')
      .options({
        mode: 'cors',
        credentials: 'include',
      })
      .headers(this._headers);
  }

  _removeToken = () => {
    this.token = '';
    this.externalApi = this.externalApi.headers(this._headers);
  };

  _setToken = (value: string) => {
    this.token = `Bearer ${value}`;
    this.externalApi = this.externalApi.headers({
      ...this._headers,
      Authorization: this.token,
    });
  };

  _setHeaders = () => {
    this.externalApi;
  };

  login = async ({ phone, pin }: LoginParameters): Promise<LoginResponse> =>
    await this.externalApi
      .url('login/?forced=yes')
      .post({
        phone,
        pin,
      })
      .json((result: LoginResponse) => {
        this._setToken(result.access_token);

        return result;
      });

  signUp = async ({ phone }: { phone: string }): Promise<SignUpResponse> =>
    await this.externalApi
      .url('users/')
      .post({
        phone,
      })
      .json((result: SignUpResponse) => result);

  confirmOtp = async ({
    otp,
    queryId,
  }: {
    otp: string;
    queryId: string;
  }): Promise<{ status: number }> =>
    await this.externalApi
      .url(`users/confirm-otp/?query-id=${queryId}`)
      .post({
        otp,
      })
      .json((result: LoginResponse) => result);
}

const Api = new ApiClass();

export default Api;
