/* eslint-disable prettier/prettier */
import { QUIZ_ID } from 'modules/moments/constants';
import { UserMoment } from 'modules/profile/types';
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
// import { GetPostsResponseType } from 'types/PostsTypes';
import { Quiz } from 'types/QuizTypes';
import wretch from 'wretch';

class ApiClass {
  externalApi;
  token = '';
  refreshToken = '';
  queryId = '';
  baseUrl = 'http://ihold.yameenyousuf.com/api/';

  _otp = 0;
  _headers = {
    'Content-Type': 'application/json',
  };

  constructor() {
    this.externalApi = wretch(this.baseUrl)
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
        console.log(phone);
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

  signIn = async ({
    phone,
    pin,
    countryCode,
    fcmToken,
  }: LoginParameters): Promise<SignInResponseType> =>
    await this.externalApi
      .url('auth/login')
      .post({
        phone: phone,
        password: pin,
        fcmToken: fcmToken,
        countryCode: countryCode,
      })
      .json((result: SignInResponseType) => {
        this.token = result.data.accessToken;
        this.refreshToken = result.data.refreshToken;
        console.log(result, 'yuyuyi');
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

  authRegister = async ({ userName, phone, dob, password, countryCode, fcmToken }: any) => {
    try {
      return await this.externalApi
        .url('auth/register')
        .post({
          userName,
          phone,
          dob,
          password,
          countryCode,
          fcmToken,
        })
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  registerMerchant = async ({ phone, password }: any) => {
    try {
      return await this.externalApi
        .url('auth/register')
        .post({
          role: 'merchant',
          phone,
          password,
          countryCode: 'PK',
          fcmToken: '1234567',
        })
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  loginMerchant = async ({ phone, password }: any) => {
    try {
      return await this.externalApi
        .url('auth/login')
        .post({
          role: 'merchant',
          phone,
          password,
          countryCode: 'PK',
          fcmToken: '1234567',
        })
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  scanQRCode = async ({ qrCode, userId }: any) => {
    try {
      return await this.externalApi
        .url('cartpo/qr')
        .post({
          qrCode,
          userId,
        })
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  getTransactions = async (page: any) => {
    try {
      return await this.externalApi
        .url(`plastic/transactions?page=${page}`)
        .get()
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  getCartpoSettings = async () => {
    try {
      return await this.externalApi
        .url(`cartpo`)
        .get()
        .json(result => {
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  updateCartpoSettings = async data => {
    try {
      return await this.externalApi
        .url(`cartpo`)
        .post(data)
        .json(result => {
          console.log(result);
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  getWalletBalance = async () => {
    try {
      return await this.externalApi
        .url(`cartpo/balance`)
        .get()
        .json(result => {
          console.log(result);
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  withdrawBalance = async ({ amount }: any) => {
    try {
      return await this.externalApi
        .url(`cartpo/withdraw`)
        .post({ amount: amount })
        .json(result => {
          console.log(result);
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  updateCartpoMenu = async (formData: any) => {
    try {
      return await this.externalApi
        .url(`cartpo/shop/menu`)
        .post(formData)
        .json(result => {
          console.log(result, 'lklklklk');
          return result;
        });
    } catch (error) {
      throw error;
    }
  };

  setReferralCode = async ({ referralCode }: { referralCode: string }) =>
    await this.externalApi
      .url('user/referral-code')
      .put({ referralCode: referralCode.toString() })
      .json(result => result);

  followUnFollowUseer = async (user: string, followed: boolean) =>
    await this.externalApi
      .url(followed ? 'user/unfollow' : 'user/follow')
      .put({ followingUserId: user })
      .json(result => result);

  updateuser = async (user: any) =>
    await this.externalApi
      .url('user')
      .put(user)
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
      .url('otp/generate')
      .post({ phone: phoneNumber })
      .json(result => {
        console.log(result, 'eeeeeee');
        return result;
      });

  resetPinCodeConfirm = async ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
    await this.externalApi
      .url('otp/verify')
      .put({ otp: code })
      .json(result => {
        console.log(result, 'cohewoihdoiehoid');
        return result;
      });

  resetPinCodeFromCode = async ({ phoneNumber, pin }: { phoneNumber: string; pin: number }) =>
    await this.externalApi
      .url('auth/reset-password')
      .put({ password: pin, confirmPassword: pin })
      .json(result => {
        console.log(result, 'dddddddddddddd');
        return result;
      });

  getPlasticSizes = async (): Promise<PlasticItemType[]> =>
    await this.externalApi
      .url('plastic/sizes?page=1')
      .get()
      .json(result => {
        return result.data.data;
      });

  // getClosestDropOffLocations = async ({} // latitude,
  // // longitude,
  // : {
  //   // latitude: number;
  //   // longitude: number;
  // }): Promise<DropOffLocationItemType[]> =>
  //   await this.externalApi
  //     .url('plastic/agents?page=1')
  //     .get()
  //     .json(result => {
  //       console.log(result.data.data);
  //       return result.data.data;
  //     });

  getDropOffLocations = async (): Promise<DropOffLocationItemType[]> =>
    await this.externalApi
      .url('plastic/agents?page=1')
      .get()
      .json(result => {
        console.log(result.data.data);
        return result.data.data;
      });

  addPlastics = async ({
    communityPointRatio,
    virtualMoneyRatio,
    plastics,
    plasticAgent,
  }: {
    plasticAgent: string;
    virtualMoneyRatio: any;
    communityPointRatio: any;
    plastics: { size: number; quantity: number }[];
  }): Promise<AddPlasticResponseType> =>
    await this.externalApi
      .url('plastic')
      .post({
        plasticAgent: plasticAgent,
        virtualMoneyRatio: virtualMoneyRatio,
        communityPointRatio: communityPointRatio,
        plastics: plastics,
      })
      .json(result => {
        console.log(plastics);
        console.log(result);
        return result;
      });

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

  // checkUserIsAgent = async (): Promise<{
  //   agentId: number;
  //   isAgent: boolean;
  //   todayDelivery: number;
  //   totalDelivery: number;
  // }> =>
  //   await this.externalApi
  //     .url('plastics/plastic-agents/check/')
  //     .headers({
  //       ...this._getAuthorization(this.token),
  //     })
  //     .get()
  //     .json(result => {
  //       let isAgent = undefined;
  //       try {
  //         isAgent =
  //           result.details.includes('authenticated user is agent.') ||
  //           result.details.includes('user is agent') ||
  //           result.details.includes('is agent');
  //       } catch {
  //         isAgent = false;
  //       }

  //       return {
  //         isAgent,
  //         agentId: result.id,
  //         totalDelivery: result.total_delivery,
  //         todayDelivery: result.today_delivery,
  //         dropoff_locations: result.dropoff_locations,
  //         ...result,
  //       };
  //     });

  checkUserIsAgent = async (id: string) =>
    await this.externalApi
      .url('plastic/agent/count/' + id)
      .get()
      .json(result => {
        return result.data;
      });

  getTotalPlasticsToday = async (): Promise<boolean> =>
    await this.externalApi
      .url('plastics/?delivery-date=now')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getPlasticsFuture = async () =>
    await this.externalApi
      .url(`plastic/upcoming`)
      .get()
      .json(result => {
        return result.data;
      });

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

  // decodeQrCode = async ({
  //   ...params
  // }: {
  //   query_id: string;
  //   plastic_id: string;
  //   encrypted_data: string;
  // }): Promise<DecodePlasticsQrResponseType> =>
  //   await this.externalApi
  //     .url('plastics/qrcode/')
  //     .headers({
  //       ...this._getAuthorization(this.token),
  //     })
  //     .post({ key: 'iHolda_Secret_Key', ...params })
  //     .json(result => result);

  basicVerification = async ({
    gender,
    fullName,
    dob,
    email,
    city,
    country,
    referenceUsers,
  }: {
    gender: string;
    fullName: string;
    dob: string;
    email: string;
    city: string;
    country: string;
    referenceUsers: { user: string }[];
  }) => {
    return await this.externalApi
      .url('user/verify/basic')
      .put({
        gender,
        fullName,
        dob,
        email,
        city,
        country,
        referenceUsers,
      })
      .json(result => {
        console.log(result, 'hjhjhjhjhj');
        return result;
      });
  };

  searchUsers = async (searchText: string) => {
    const apiUrl =
      searchText.trim() === '' ? 'user/suggestions' : `user/suggestions?search=${searchText}`;
    const result = await this.externalApi.url(apiUrl).get().json();
    return result.data.data;
  };

  getNotifications = async () => {
    const apiUrl = 'user/notifications';
    const result = await this.externalApi.url(apiUrl).get().json();
    console.log(result, 'notification');
    return result.data;
  };

  changePassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<unknown> =>
    await this.externalApi
      .url('user/change-password')
      .post({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      })
      .json(result => {
        console.log(result, 'asjdqjpojpwqej api');
        return result;
      });

  deleteAccount = async () => {
    await this.externalApi
      .url('user/remove-account')
      .delete()
      .json(result => {
        console.log(result);
        return result;
      });
  };

  setPaymentAccount = async ({ number, default: paymentDefault, confirmNumber }: any) => {
    const response = await this.externalApi
      .url('user/payment-accounts')
      .post({
        linkedPaymentAccounts: [
          {
            number: number,
            default: paymentDefault,
            confirmNumber: confirmNumber,
          },
        ],
      })
      .json((result: any) => {
        console.log(result, 'payment account set successfully');
        return result;
      });

    return response;
  };

  referenceResponse = async (userId: string, status: string) => {
    try {
      const requestBody = {
        status: status,
      };
      const result = await this.externalApi
        .url(`user/verify/basic/${userId}`)
        .put(requestBody)
        .json();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  approvedPlasticDelivery = async ({
    plasticId,
    plastics,
    queryId,
  }: {
    queryId: string;
    plasticId: number | string;
    plastics: any;
  }): Promise<unknown> =>
    await this.externalApi
      .url('plastic/complete')
      .post({
        plasticId: queryId,
        plasticAgent: plasticId,
        ...(plastics ? { plastics } : null),
      })
      .json(result => {
        console.log(result, 'asjdqjpojpwqej api');
        return result;
      });

  getUserProfile = async (userId?: string): Promise<SignInResponseType> =>
    await this.externalApi
      .url('user' + (userId ? '?userId=' + userId : ''))
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getUserProfile0 = async (): Promise<SignInResponseType> =>
    await this.externalApi
      .url('user')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getMetAndFriendRank = async (userId?: string): Promise<any> =>
    await this.externalApi
      .url('met/user-rank?' + `userId=${userId}`)
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
      .url(`user/qr?q=${queryId}`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  agentScan = async ({ queryId, agentId }: { queryId: string; agentId: string }): Promise<any> =>
    await this.externalApi
      .url(`plastic/scan/${queryId}/${agentId}`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  withdrawFromWallet = async (amount: number): Promise<any> =>
    await this.externalApi
      .url(`plastic/withdraw`)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post({ amount })
      .json(result => result);

  postMoments = async (reqBody: FormData): Promise<PostMomentsResponse> =>
    await this.externalApi
      .url('met/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post(reqBody)
      .json(result => result);
  getUserMoments = async (
    userId?: string,
    userId2?: string,
    page?: number,
  ): Promise<{ data: { data: UserMoment[] } }> =>
    await this.externalApi
      .url(
        'met?' +
          (userId ? `userId=${userId}` : '') +
          (userId2 ? `userId2=${userId2}` : '') +
          (page ? `page=${page}` : ''),
      )
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getMoments = async (): Promise<GetMomentsResponseType[]> =>
    await this.externalApi
      .url('moments/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getWalletBalance = async (): Promise<any> =>
    await this.externalApi
      .url('plastic/balance/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getTransactions = async (): Promise<any> =>
    await this.externalApi
      .url('plastic/transactions')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getRestaurents = async (): Promise<any> =>
    await this.externalApi
      .url('restaurant/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getNotifications = async (): Promise<any> =>
    await this.externalApi
      .url('user/notifications/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result.data.data);

  getFeed = async (): Promise<any> =>
    await this.externalApi
      .url('post/')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result.data);

  getCommunityPointsRank = async (): Promise<CommunityRankItemType[]> =>
    await this.externalApi
      .url('wallets/get-by/?community-points=highest&period=month')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  getMetLeaderboard = async (): Promise<
    {
      _id: string;
      user: {
        _id: string;
        userName: string;
        firstName: null | string;
        lastName: null | string;
        photo: null | { mediaType: string; mediaId: string };
      };
      metCount: 1;
    }[]
  > =>
    await this.externalApi
      .url('met/user/leaderboard?page=1')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result.data.data);
  getMetPairLeaderboard = async (): Promise<
    {
      _id: string;
      users: {
        _id: string;
        userName: string;
        firstName: null | string;
        lastName: null | string;
        photo: null | { mediaType: string; mediaId: string };
      }[];
      metCount: 1;
    }[]
  > =>
    await this.externalApi
      .url('met/pair/leaderboard?page=1')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result.data.data);

  getQuizs = async (): Promise<{ data: { quiz: Quiz } }> =>
    await this.externalApi
      .url('quiz/' + QUIZ_ID)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getFollowers = async (userId?: string): Promise<{ data: any }> =>
    await this.externalApi
      .url('user/followers' + userId ? `&userId=${userId}` : '')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getMets = async (userId?: string): Promise<{ data: any }> =>
    await this.externalApi
      .url('met/users' + userId ? `&userId=${userId}` : '')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);
  getSuggestions = async (): Promise<{ data: any }> =>
    await this.externalApi
      .url('user/suggestions')
      .headers({
        ...this._getAuthorization(this.token),
      })
      .get()
      .json(result => result);

  createPost = async (reqBody: FormData): Promise<PostMomentsResponse> =>
    await this.externalApi
      .url('post/')
      .headers({
        ...this._getAuthorization(this.token),
        'Content-Type': 'multipart/form-data',
      })
      .post(reqBody)
      // .res();
      .json(result => result);

  sharePost = async (reqBody: { postId: string }): Promise<any> =>
    await this.externalApi
      .url('post/share/' + reqBody.postId)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post(reqBody)
      .json(result => result);
  bookMarkPost = async (reqBody: { postId: string }): Promise<any> =>
    await this.externalApi
      .url('user/bookmark/' + reqBody.postId)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .post(reqBody)
      .json(result => result);
  likeUnlikePost = async (reqBody: { postId: string }): Promise<any> =>
    await this.externalApi
      .url('post/like/' + reqBody.postId)
      .headers({
        ...this._getAuthorization(this.token),
      })
      .put(reqBody)
      .json(result => result);
}

const Api = new ApiClass();

export default Api;
