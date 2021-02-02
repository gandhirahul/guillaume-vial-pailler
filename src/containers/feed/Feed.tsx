import * as React from "react";
import styled from "styled-components";

import { NewTweetContext } from "../../providers/tweets";
import { mediaQueries } from "../../componentsLibrary/utils/mediaQueries";
import { Tweet } from "../../clients/twitter";
import { getMinimisedImage } from "../../helpers/image";
import { removeTweetIdFromText } from "../../helpers/tweet";
import { formatTimestamp } from "../../helpers/dateTime";

import TweetComponent from "../../componentsLibrary/components/tweet/Tweet";

const FeedContainer = styled.ul`
  margin: 0 auto;
  width: 95%;
  padding: 0;
  ${mediaQueries.md} {
    width: 75%;
  }
  ${mediaQueries.lg} {
    width: 50%;
  }
`;

const TweetWrapper = styled.li`
  list-style-type: none;
`;

const Feed = () => {
  const { tweets, mockUpTweets } = React.useContext(NewTweetContext);
  return (
    <>
      <h2>Latest Tweets</h2>
      <FeedContainer>
        {mockUpTweets.length > 0 &&
          tweets.length === 0 &&
          mockUpTweets.map((mockUpTweet) => (
            <TweetWrapper key={mockUpTweet.id}>
              <TweetComponent
                id={mockUpTweet.id}
                isLoading={true}
                image={undefined}
                text={undefined}
                username={undefined}
                timeStamp={undefined}
              />
            </TweetWrapper>
          ))}
        {tweets.map((tweet: Tweet) => (
          <TweetWrapper key={tweet.id}>
            <TweetComponent
              isLoading={false}
              id={tweet.id}
              image={getMinimisedImage(tweet.id, tweet.image)}
              text={removeTweetIdFromText(tweet.id, tweet.text)}
              username={tweet.username}
              timeStamp={formatTimestamp(tweet.timeStamp)}
            />
          </TweetWrapper>
        ))}
      </FeedContainer>
    </>
  );
};

export default Feed;
