import { LoginParameters, LoginResponse, SignUpResponse } from 'types/AuthTypes';
import {
  AddPlasticResponseType,
  DropOffLocationItemType,
  PlasticItemType,
} from 'types/PlasticTypes';
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
    this.externalApi = wretch('https://holda-backend-8t993.ondigitalocean.app/api/')
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

  addPlastics = async ({
    userType,
    sizes,
    dropOffLocation,
  }: {
    dropOffLocation: number;
    userType: 'AGENT' | 'USER';
    sizes: { size: number; quantity: number }[];
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url('plastics/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({
        sizes: sizes,
        user_type: userType,
        dropoff_location: dropOffLocation,
      })
      .json(result => result);

  updatePlastics = async ({
    sizes,
    userType,
    plasticId,
    dropOffLocation,
  }: {
    plasticId: number;
    dropOffLocation: number | undefined;
    userType: 'AGENT' | 'USER';
    sizes: { size: number; quantity: number }[];
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url(`plastics/${plasticId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .patch({
        sizes: sizes,
        user_type: userType,
        dropoff_location: dropOffLocation,
      })
      .json(result => result);

  updatePlasticRatios = async ({
    cash,
    point,
    plasticId,
  }: {
    cash: number;
    point: number;
    plasticId: number;
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url(`plastics/${plasticId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .patch({
        virtual_money_ratio: cash,
        community_point_ratio: point,
      })
      .json(result => result);

  checkUserIsAgent = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/plastic-agents/check/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => {
        let isAgent = undefined;
        try {
          isAgent =
            result.details.includes('authenticated user is agent.') ||
            result.details.includes('user is agent') ||
            result.details.includes('is agent');
        } catch {
          isAgent = false;
        }

        return isAgent;
      });

  getTotalPlasticsToday = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/?delivery-date=now')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getPlasticsFuture = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/?delivery-date=now')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getPlasticsAll = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/?is-community-point=0')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getDropOffLocationByAgentId = async ({ id }: { id: number }): Promise<boolean> =>
    await this.externalApi
      .url(`plastics/drop-off-locations/?agent-id=${id}`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  decodeQrCode = async ({
    ...params
  }: {
    query_id: string;
    plastic_id: string;
    encrypted_data: string;
  }): Promise<boolean> =>
    await this.externalApi
      .url('plastics/qrcode/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ key: 'iHolda_Secret_Key', ...params })
      .json(result => result);

  approvedPlasticDelivery = async ({
    queryId,
    plasticId,
  }: {
    queryId: string;
    plasticId: string;
  }): Promise<unknown> =>
    await this.externalApi
      .url('plastics/delivery/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ query_id: queryId, plastic_id: plasticId })
      .json(result => result);

  getUserProfile = async () =>
    await this.externalApi
      .url(`userprofiles/${this.queryId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  addMoment = async () =>
    await this.externalApi
      .url('plastics/delivery/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({})
      .json(result => result);

  postMeetup = async ({ queryId }: { queryId: string }) =>
    await this.externalApi
      .url('meetups/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({
        key: 'iHolda_Secret_Key',
        query_id: queryId,
      })
      .json(result => result);
}

const Api = new ApiClass();

export default Api;
