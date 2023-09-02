/* eslint-disable @typescript-eslint/no-var-requires */
import { CountryCodeType } from 'types/AuthTypes';

export const useLoadCountries = (): {
  countries: CountryCodeType[];
} => ({
  countries: require('../../assets/data/countryCode.json').countries,
});
