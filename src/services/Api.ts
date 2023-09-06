import { LoginParameters, LoginResponse, SignUpResponse } from 'types/AuthTypes';
import { DropOffLocationItemType, PlasticItemType } from 'types/PlasticTypes';
import wretch from 'wretch';

class ApiClass {
  externalApi;
  token = '';
  queryId = '';

  _otp = 0;
  _headers = {
    'Agent-Signature': 'mobile/iB+44',
    'Content-Type': 'application/json',
  };

  constructor() {
    this.externalApi = wretch('https://holda-backend-muyrh.ondigitalocean.app/api/')
      .options({
        mode: 'cors',
        credentials: 'include',
      })
      .headers(this._headers);
  }

  _getAuthorization = (value: string) => ({
    Authorization: 'Bearer ' + value,
  });

  _removeToken = () => {
    this.token = '';
    this.externalApi = this.externalApi.headers(this._headers);
  };

  setTokenValue = (value: string) => {
    this.token = value;
  };

  setQueryIdValue = (value: string) => {
    this.queryId = value;
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

  signIn = async ({ phone, pin }: LoginParameters): Promise<LoginResponse> =>
    await this.externalApi
      .url('login/?forced=yes')
      .post({
        pin,
        phone,
      })
      .json((result: LoginResponse) => {
        this.token = result.access_token;
        this.queryId = result.query_id;

        return result;
      });

  signUp = async ({ phone }: { phone: string }): Promise<SignUpResponse> =>
    await this.externalApi
      .url('users/')
      .post({
        phone,
      })
      .json((result: SignUpResponse) => {
        this.queryId = result.query_id;
        this.token = result.access_token;
        this._otp = result.otp;

        return result;
      });

  confirmOtp = async ({ otp }: { otp: string }): Promise<{ status: number }> =>
    await this.externalApi
      .url(`users/confirm-otp/?query-id=${this.queryId}`)
      .post({ otp })
      .json((result: LoginResponse) => result);

  uploadImage = async ({ image }: { image: string }): Promise<unknown> =>
    await this.externalApi
      .url(`userprofiles/${this.queryId}/images/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ image })
      .json(result => result);

  updateUsername = async ({ username }: { username: string }): Promise<unknown> =>
    await this.externalApi
      .url(`users/${this.queryId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .patch({ username })
      .json(result => result);

  setPin = async ({ pin }: { pin: number }): Promise<{ status: number }> =>
    await this.externalApi
      .url(`users/${this.queryId}/pin/`)
      .post({ pin })
      .json(result => result);

  setReferralCode = async ({ referralCode }: { referralCode: string }) =>
    await this.externalApi
      .url('referrals/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ referral_code: referralCode })
      .json(result => result);

  getWaitingList = async () =>
    await this.externalApi
      .url(`users/?waiting-list=list&query-id=${this.queryId}`)
      .get()
      .json(result => {
        if (!result?.id) {
          return {};
        }

        return result;
      });

  sendCodeForForgotPin = async ({ phoneNumber }: { phoneNumber: string }) =>
    await this.externalApi
      .url('reset/forgot-pin/send-code/')
      .post({ phone: phoneNumber })
      .json(result => result);

  resetPinCodeConfirm = async ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
    await this.externalApi
      .url('reset/forgot-pin/send-code/')
      .post({ phone: phoneNumber, code })
      .json(result => result);

  resetPinCodeFromCode = async ({ phoneNumber, pin }: { phoneNumber: string; pin: number }) =>
    await this.externalApi
      .url('reset/reset-pin/from-code/')
      .post({ phone: phoneNumber, pin })
      .json(result => result);

  // Plastic
  getPlasticSizes = async (): Promise<PlasticItemType[]> =>
    await this.externalApi
      .url('plastics/sizes/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getClosestDropOffLocations = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }): Promise<DropOffLocationItemType[]> =>
    await this.externalApi
      .url(`plastics/drop-off-locations/?lat=${latitude}&lon=${longitude}`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getDropOffLocations = async (): Promise<DropOffLocationItemType[]> =>
    await this.externalApi
      .url('plastics/drop-off-locations/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
}

const Api = new ApiClass();

export default Api;
