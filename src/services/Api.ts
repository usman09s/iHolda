/* eslint-disable prettier/prettier */
import { DecodePlasticsQrResponseType } from 'types/AgentPlasticTypes';
import {
  LoginParameters,
  LoginResponse,
  SignInResponseType,
  SignUpResponse,
  VerifyOTPMessage,
  VerifyOTPResponse,
  VerifyPhoneBeforeRegisterMessage,
  VerifyPhoneBeforeRegisterResponse,
} from 'types/AuthTypes';
import { CommunityRankItemType } from 'types/LeaderBoardTypes';
import { GetMomentsResponseType, PostMomentsResponse } from 'types/MomentsTypes';
import {
  AddPlasticResponseType,
  DropOffLocationItemType,
  PlasticItemType,
} from 'types/PlasticTypes';
import wretch from 'wretch';

class ApiClass {
  externalApi;
  token = '';
  refreshToken = '';
  queryId = '';

  _otp = 0;
  _headers = {
    'Content-Type': 'application/json',
  };

  constructor() {
    this.externalApi = wretch('http://ihold.yameenyousuf.com/api/')
      .options({
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

  verifyPhoneBeforeRegister = async ({
    phone,
  }: {
    phone: string;
  }): Promise<VerifyPhoneBeforeRegisterResponse> =>
    await this.externalApi
      .url('otp/register')
      .post({
        phone,
      })
      .json((result): VerifyPhoneBeforeRegisterResponse => {
        this._otp = result.data.otp;

        return {
          ...result,
          navigateTo:
            result.message === VerifyPhoneBeforeRegisterMessage.OTP_GENERATED_SUCCESSFULLY &&
            'ConfirmOtp',
        };
      })
      .catch(err => {
        const error = JSON.parse(err.message);
        if (error?.message === VerifyPhoneBeforeRegisterMessage.PHONE_NUMBER_IS_EXIST) {
          return {
            navigateTo: 'SignIn',
            message: error?.message || '',
          };
        }

        throw { message: 'Try again!' };
      });

  verifyOtp = async ({ otp }: { otp: string }) =>
    await this.externalApi
      .url('otp/verify')
      .put({ otp })
      .json((result: VerifyOTPResponse) => {
        if (result.message === VerifyOTPMessage.OTP_NOT_FOUND) {
          throw result;
        }

        return {
          ...result,
          navigateTo:
            result.message === VerifyOTPMessage.OTP_VERIFIED_USER_NOT_REGISTERED &&
            'UserAvatarAndUsernameUpdate',
        };
      })
      .catch(err => {
        throw { message: JSON.parse(err.message)?.message };
      });

  signIn = async ({ phone, pin }: LoginParameters): Promise<SignInResponseType> =>
    await this.externalApi
      .url('auth/login')
      .post({
        phone: phone,
        password: pin,
        fcmToken: phone,
      })
      .json((result: SignInResponseType) => {
        this.token = result.data.accessToken;
        this.refreshToken = result.data.refreshToken;

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
      .url('reset/forgot-pin/send-code/?delete-retry=yes')
      .post({ phone: phoneNumber })
      .json(result => result);

  resetPinCodeConfirm = async ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
    await this.externalApi
      .url('reset/reset-pin-code/confirm/')
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

  updatePlasticsSizes = async ({
    sizes,
    plasticId,
  }: {
    plasticId: number;
    sizes: { size: number | string; quantity: number }[];
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url(`plastics/${plasticId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .patch({ sizes })
      .json(result => result);

  updatePlasticsSizesx = async ({
    sizes,
    queryId,
    plasticId,
  }: {
    queryId: string;
    plasticId: number;
    sizes: { size: number | string; quantity: number }[];
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url(`plastics/${plasticId}/`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .patch({ sizes, queryId })
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

  checkUserIsAgent = async (): Promise<{
    agentId: number;
    isAgent: boolean;
    todayDelivery: number;
    totalDelivery: number;
  }> =>
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

        return {
          isAgent,
          agentId: result.id,
          totalDelivery: result.total_delivery,
          todayDelivery: result.today_delivery,
          dropoff_locations: result.dropoff_locations,
          ...result,
        };
      });

  getTotalPlasticsToday = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/?delivery-date=now')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getPlasticsFuture = async ({ locationId }: { locationId: number }): Promise<boolean> =>
    await this.externalApi
      .url(`plastics/?is_delivered=false&dropoff-location-id=${locationId}`)
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
  }): Promise<DecodePlasticsQrResponseType> =>
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
    plasticId: number;
  }): Promise<unknown> =>
    await this.externalApi
      .url('plastics/delivery/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ query_id: queryId, plastic_id: plasticId })
      .json(result => result);

  getUserProfile = async (): Promise<SignInResponseType> =>
    await this.externalApi
      .url('user')
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

  postMeetup = async ({ queryId }: { queryId: string }): Promise<PostMomentsResponse> =>
    await this.externalApi
      .url('meetups/?latitude=35.6762&longitude=139.6503')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({
        key: 'iHolda_Secret_Key',
        query_id: queryId,
      })
      .json(result => result);

  postMoments = async ({
    caption,
    moments,
    meetupId,
  }: {
    meetupId: number;
    caption: string;
    moments: { file: string }[];
  }): Promise<PostMomentsResponse> =>
    await this.externalApi
      .url('moments/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({
        caption,
        moments,
        meetup_id: meetupId,
      })
      .json(result => result);

  getMoments = async (): Promise<GetMomentsResponseType[]> =>
    await this.externalApi
      .url('moments/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getCommunityPointsRank = async (): Promise<CommunityRankItemType[]> =>
    await this.externalApi
      .url('wallets/get-by/?community-points=highest&period=month')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
}

const Api = new ApiClass();

export default Api;
