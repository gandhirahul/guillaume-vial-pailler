import { formatTimestamp } from './dateTime';

describe('Given a timestamp processed by the formatTimestamp helper', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Date.now = jest.fn(() => 1610993448779); // Mon Jan 18 2021 18:10:48
  });

  it('returns the difference in time in seconds if the timestamp is less than a minute old', () => {
    const timestamp = 1610993408779; // Mon Jan 18 2021 18:10:08
    expect(formatTimestamp(timestamp)).toEqual('40s');
  });

  it('returns the difference in time in minutes if the timestamp is less than 1 hour old', () => {
    const timestamp = 1610990408779; // Mon Jan 18 2021 17:20:08
    expect(formatTimestamp(timestamp)).toEqual('50m');
  });

  it('returns the difference in time in hours if the timestamp is less than 24 hours old', () => {
    const timestamp = 1610950408779; // Mon Jan 18 2021 06:13:28
    expect(formatTimestamp(timestamp)).toEqual('11h');
  });

  it('returns the full date if the timestamp is more than 24h old', () => {
    const timestamp = 1487076708000; //14.02.2017
    expect(formatTimestamp(timestamp)).toEqual('Feb 14, 2017');
  });
});
