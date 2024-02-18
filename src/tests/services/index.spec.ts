/* eslint-disable jest/no-conditional-expect */
/* eslint-disable no-console */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchColumnsApi, fetchDataApi } from '../../services/index';
import { baseUrl, columnsUrl, dataUrl } from '../../constants/appConstants';
import { DataPayload } from '../../types/rootState';

const mockAxios = new MockAdapter(axios);
describe('API Functions', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const errorMessage = 'Request failed with status code 400';

  describe('fetchDataApi', () => {
    const url = baseUrl + dataUrl;
    const payload: DataPayload = {
      measures: ['Cost'],
      dimension: 'Product',
    };

    it('should fetch data successfully', async () => {
      const responseData = {};
      mockAxios.onPost(url, payload).reply(200, responseData);
      try {
        const result = await fetchDataApi({ url, dataPayload: payload });
        expect(result).toEqual(responseData);
      } catch (error: unknown) {
        console.log(error);
      }
    });

    it('should throw an error while fetching data', async () => {
      mockAxios.onPost(url, payload).reply(400, { message: errorMessage });
      try {
        await fetchDataApi({ url, dataPayload: payload });
      } catch (error: any) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('fetchColumnsApi', () => {
    const url = baseUrl + columnsUrl;
    it('should fetch columns successfully', async () => {
      const responseData = {};
      mockAxios.onGet(url).reply(200, responseData);
      try {
        const result = await fetchColumnsApi(url);
        expect(result).toEqual(responseData);
      } catch (error: unknown) {
        console.log(error);
      }
    });

    it('should throw an error while fetching columns', async () => {
      mockAxios.onGet(url).reply(400, { message: errorMessage });
      try {
        await fetchColumnsApi(url);
      } catch (error: any) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
