import * as React from "react";

import { getTweets, Tweet } from "../clients/twitter";
import * as configData from "../config.json";

const defaultFetchTimeout = configData.TWITTER_API_TWEET_FETCH_DEFAULT_TIMEOUT;

type MockUpTweet = {
  id: number;
};

type ContextProps = {
  tweets: Tweet[];
  mockUpTweets: MockUpTweet[];
};

export const NewTweetContext = React.createContext<ContextProps>({
  tweets: [],
  mockUpTweets: []
});

export const TweetContext = (props: { children: React.ReactNode }) => {
  const loadingTweetState: MockUpTweet[] = [];
  const tweetFetchLimit = configData.TWITTER_API_TWEET_FETCH_LIMIT;
  for (let i = 0; i < tweetFetchLimit; i++) {
    loadingTweetState.push({ id: i + 1 });
  }
  const [mockUpTweets] = React.useState(loadingTweetState);

  const [apiFetchCount, setApiFetchCount] = React.useState(0);
  const [status, setStatus] = React.useState("idle");
  const [tweets, setTweets] = React.useState<Tweet[]>([]);
  const [highestTweetId, setHighestTweetId] = React.useState<
    number | undefined
  >(undefined);
  const [apiErrorCount, setApiErrorCount] = React.useState(0);
  const [apiFetchTimeout, setApiFetchTimeout] = React.useState(
    defaultFetchTimeout
  );

  const insertLatestTweets = (newestTweetsData: Tweet[]) => {
    const latestHighestTweedId = newestTweetsData[0].id;
    const isLatestHighestTweedIdHigher =
      highestTweetId === undefined || latestHighestTweedId > highestTweetId;

    if (
      (newestTweetsData.length > 0 && isLatestHighestTweedIdHigher) ||
      isLatestHighestTweedIdHigher === undefined
    ) {
      setTweets([...newestTweetsData, ...tweets]);
      setHighestTweetId(latestHighestTweedId);
    }
  };

  const handleSuccessfulTweetFetch = (newestTweetsData: Tweet[]) => {
    if (newestTweetsData.length > 0) {
      insertLatestTweets(newestTweetsData);
    }
    setApiFetchCount(apiFetchCount + 1);
    setApiErrorCount(0);
    setApiFetchTimeout(defaultFetchTimeout);
    setStatus("idle");
  };

  const handleFailedTweetFetch = (errorMessage: string) => {
    /* 
      TODO: Integrate Sentry to remove console logs
      The error log bellow is intentional. It will be replaced with a Sentry call
      @See decisions.md
    */
    console.error(`Error fetching Tweets: ${errorMessage}`);
    const newApiErrorCount = apiErrorCount + 1;
    setApiErrorCount(newApiErrorCount);
    if (newApiErrorCount > 3) {
      /* 
        TODO: Integrate Sentry to remove console logs
        The warning log bellow is intentional. It will be replaced with a Sentry call
        @See decisions.md
      */
      console.warn(`Increased timeout while fetching Tweets`);
      setApiFetchTimeout(defaultFetchTimeout + 3000);
    }
    setStatus("idle");
  };

  async function fetchTweets(queryParams?: string) {
    setStatus("fetching");

    try {
      const newestTweets = await getTweets(queryParams);
      if (newestTweets.status === 200 && newestTweets.data) {
        handleSuccessfulTweetFetch(newestTweets.data);
      }
    } catch (error) {
      handleFailedTweetFetch(error.message);
      return;
    }
  }

  const fetchTweetsByApplicationState = () => {
    if (apiFetchCount === 0 && status === "idle") {
      fetchTweets();
    }

    if (apiFetchCount > 0 && status === "idle") {
      setTimeout(
        () => fetchTweets(`&afterId=${highestTweetId}`),
        apiFetchTimeout
      );
    }
  };

  React.useEffect(() => {
    fetchTweetsByApplicationState();
  });

  return (
    <NewTweetContext.Provider
      value={{ tweets: tweets, mockUpTweets: mockUpTweets }}
    >
      {props.children}
    </NewTweetContext.Provider>
  );
};
