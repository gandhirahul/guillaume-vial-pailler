import { removeTweetIdFromText } from './tweet';

describe('Given a tweet processed by the removeTweetIdFromText helper', () => {
  const userId = 1;
  it('returns the tweet ID from the text if the ID matches the user ID', () => {
    const tweetText = `${userId}. This is a tweet`;
    const result = removeTweetIdFromText(userId, tweetText);
    expect(result).toEqual('This is a tweet');
  });

  it('returns the full tweet text if the ID  cannot be matched with the user ID', () => {
    const tweetText = '112 - This is a tweet';
    const result = removeTweetIdFromText(userId, tweetText);
    expect(result).toEqual(tweetText);
  });
});
