import * as React from 'react';
import styled from 'styled-components';

import { theme } from '../../styles/colours';
import { spacing } from '../../styles/spacing';
import { avatarSize } from '../../styles/images';
import { mediaQueries } from '../../utils/mediaQueries';

const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: ${spacing.md} ${avatarSize.sm} ${spacing.md} auto auto ${spacing.md};
  grid-template-rows: ${spacing.md} ${spacing.md} ${spacing.sm} auto ${spacing.md};
  width: 100%;
  min-width: 220px;
  max-width: 720px;
  background-color: ${theme.colours.brand.white};
  margin: ${spacing.md} auto;
  min-height: 120px;
  box-shadow: 2px 3px 5px ${theme.colours.brand.darkGray};
  ${mediaQueries.md} {
    grid-template-columns: ${spacing.md} ${avatarSize.md} ${spacing.md} auto auto ${spacing.md};
  }
`;

const avatar = `
width: ${avatarSize.sm};
height: ${avatarSize.sm};
grid-column-start: 2;
grid-column-end: 3;
grid-row-start: 2;
grid-row-end: 2;
background: ${theme.colours.brand.darkGray};
box-shadow: 0 0 0 1px ${theme.colours.brand.darkGray};
border-radius: 50px;
${mediaQueries.md} {
  width: ${avatarSize.md};
  height: ${avatarSize.md};
}
`;

const TweetAvatar = styled.img`
  ${avatar}
  overflow: hidden;
`;

const TweetEmptyAvatar = styled.div`
  ${avatar}
`;

const TweetDetail = styled.div`
  grid-column-start: 4;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 2;
  display: flex;
`;

const Username = styled.p`
  font-weight: bold;
`;

const TweetText = styled.p`
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
  padding: ${spacing.md};
  background-color: ${theme.colours.brand.lightGray};
  box-shadow: 1px 1px 1px 1px ${theme.colours.brand.mediumGray};
`;

const TimestampText = styled.time`
  padding-left: ${spacing.sm};
`;

type TweetProp = {
  isLoading: boolean;
  id: number;
  image: string;
  text: string;
  username: string;
  timeStamp: string;
};
type EmptyTweetProp = {
  isLoading: boolean;
  id: number;
  image: undefined;
  text: undefined;
  username: undefined;
  timeStamp: undefined;
};

const TweetComponent = ({
  isLoading,
  id,
  image,
  text,
  username,
  timeStamp,
}: TweetProp | EmptyTweetProp): React.ReactElement => {
  const isLoadingTweet = isLoading === true && !!id;
  const isLoadedTweet =
    isLoading === false &&
    !!id &&
    !!image &&
    !!username &&
    !!text &&
    !!timeStamp;

  if (isLoadingTweet) {
    return (
      <TweetContainer key={id}>
        <TweetEmptyAvatar />
      </TweetContainer>
    );
  }

  if (isLoadedTweet) {
    return (
      <TweetContainer key={id}>
        <TweetAvatar
          src={image}
          width="50"
          height="50"
          alt={`${username} avatar`}
        />
        <TweetDetail>
          <Username>{username}</Username>
          <TimestampText>{timeStamp}</TimestampText>
        </TweetDetail>
        <TweetText>{text}</TweetText>
      </TweetContainer>
    );
  }

  return <></>;
};

export default TweetComponent;
