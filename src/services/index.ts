import axios from 'axios';
import { DataPayload } from '../types/rootState';

export const fetchColumnsApi = async (url: string): Promise<unknown> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const fetchDataApi = async ({
  url,
  dataPayload,
}: {
  url: string;
  dataPayload: DataPayload;
}): Promise<unknown> => {
  try {
    const response = await axios.post(url, dataPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
