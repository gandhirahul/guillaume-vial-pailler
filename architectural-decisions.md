# Architectural and Code Decisions

This document lists the Architectural and Coding decisions made to complete this code test.

## Architecture

### Technology used:

This list details the technology used and reasons:

- **React 17**:
  React has been the Front-End leading framework for more than 5 years and offers stability.
- **React Hooks**:
  Hooks have been chosen for State Management. Depending on the upcoming features and complexity, Redux could be added.
- **Typescript**:
  Allows better code readability and will reduce bugs through better typings of code and expected API responses.
- **Axios**:
  Axios has a broader browser support and a faster Developer experience than the Fetch API. Given the time constraint, Axios was chosen to speed up Development.
- **Styled-Components**:
  Styled-Components allows CSS-In-JS styling and reduces the risk of CSS classes clashing with each other.
- **Custom Webpack config**:
  As the feature requirement had a focus on optimisation, a custom webpack config has been created to minimise the bundle weight.
- **Jest**:
  Although the requirements were insisting into not making efforts writing tests, Jest has been added so the code coverage can be increased.

### Twitter API Endpoint used

The decision was made to use the Twitter API `/api?count=X` endpoint to retrieve the latest Tweets. Once done, the highest tweet ID is saved in state and the following requests add the `&afterId=` query param to the API request to fetch the following tweets based on the previous highest tweet ID.

This allows the fetch of unique tweets and prevents from missing any published tweets.

### Architectural pattern

The app is organised following the following folder pattern:

```
--- clients
--- componentsLibrary
------ components
------ styles
------ utils
--- containers
--- helpers
--- providers
```

#### Environment Variables

The environment variables have been added to `config.json` file in `./src`.<br/>
This allows to control the Twitter API URL, fetch limit and default timeout.

## Performance Improvements, optimisation & handling of edge cases

### Performance Improvements

**Google's Lighthouse** was used to make sure performance was met using the Production build.

**_Note: Performances in Lighthouse may vary based on the API response received during the test_**

- On mobile, the performance score was 78:

<img src="./codeReviewAssets/mobile-lighthouse-score.png"
alt="Mobile Lighthouse Score"
style="width: 500px;" />

- On desktop, the performance score was 96:

<img src="./codeReviewAssets/desktop-lighthouse-score.png" alt="Mobile Lighthouse Score" style="width: 500px;" />

- The `index.html` file has some default Tweet placeholders so that users know the Tweets are fetching. This also prevents the page from being empty on page load. These placeholders are replaced by the React placeholders once the bundle Javascript file has loaded.

- The font used is `Sans-Serif` and is available to most browsers. This is meant to avoid loading fonts which impact performance and load time.

- The Tweet API seems to be experiencing some intermittent failures: If a user experiences 3 failed requests in a row, the timeout value is increased by 3s. After one successful request, the timeout value is resetted back to the initial 2s.

- Picture URLs have been updated in the Front-End:<br/>
  By modifying the URL from `https://i.pravatar.cc/300?u=384` to `https://i.pravatar.cc/150?u=384`, I was able to reduce the image size from 15.7kB to 5.5kB which is a 2.85x reduction from the original size. This helps with rendering performance as the Tweet avatar images are between 50px and 75px in this app.

I have created a helper named `getMinimisedImage` available in `./src/helpers/images` to do so. However, executing this helper for each Tweet will have a computing impact. A potential improvement would be to send a minimised URL in the Twitter API response payload.

- Tweet IDs have been removed from Tweet text in the Front-End:
  However, executing this helper for each Tweet will have a computing impact. A potential improvement would be to remove the Tweet ID from the Tweet Text field in the Twitter API response payload.

- There is 1 `console.warn` and 1 `console.error` in the code. These are not meant to be shipped in Production but are Sentry placeholders. These 2 logs impact the Google Performance score and should be remove as soon as possible once Sentry is added.

- In order to maximise readability of the Tweets, the API fetches 10 Tweets per 2 seconds. This means that depending on the amount of Tweet, after a few minutes the UI may not show the latest tweets. This can be changed at any time by updating the `TWITTER_API_TWEET_FETCH_LIMIT` to a higher value in the `./src/config.json` file.

### Optimisation Suggestions

- The automatic feed update has an impact on the Cumulative Layout Shift (CLS)

It is not optimal to inject content above existing content, except for user interaction. I have tried to mitigate it by loading some empty containers on the page load, however the size of a tweet container depends on its text length

- Add Sentry to the repo to remove console logs. Sentry will allow us to understand the frequency at which users face a given issue and prioritise our backlog to solve these issues.

- In the future, the component library could be imported from a NPM package and the `componentLibrary` folder removed from the App. This will also improve the user experience across different apps of the same company.

### API Improvements suggestions

- Send a minimised URL in the Twitter API response payload
- Remove the Tweet ID from the Tweet Text field in the Twitter API response payload
