import { getMinimisedImage } from './image';

describe('Given a link processed by the getMinimisedImage helper', () => {
  const userId = 1;
  it('returns a minimised version of the image link if the URL is pravatar.cc and the format is 300x300 px', () => {
    const result = getMinimisedImage(
      userId,
      `https://i.pravatar.cc/300?u=${userId}`,
    );
    expect(result).toEqual(`https://i.pravatar.cc/150?u=${userId}`);
  });

  it('returns the default URL if the URL is NOT pravatar.cc or the format is different to 300x300 px', () => {
    const unexpectedUrl = `https://i.giphy.cc/180?u=${userId}`;
    const result = getMinimisedImage(userId, unexpectedUrl);
    expect(result).toEqual(unexpectedUrl);
  });
});
