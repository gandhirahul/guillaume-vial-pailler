import axios from 'axios';

import * as configData from '../config.json';

const client = axios.create({
  baseURL: configData.TWITTER_API_URL,
});

type TweetResponse = {
  status: number;
  data: Tweet[];
};

export type Tweet = {
  image: string;
  id: number;
  text: string;
  username: string;
  timeStamp: number;
};

export const getTweets = async (
  additionalQueryParams = '',
): Promise<TweetResponse> => {
  const queryParams = `?count=${configData.TWITTER_API_TWEET_FETCH_LIMIT}${additionalQueryParams}`;
  const response = await client.get<Tweet[]>(queryParams);
  return {
    status: response.status,
    data: response.data,
  };
};
