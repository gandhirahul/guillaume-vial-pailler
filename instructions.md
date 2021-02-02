# Bumble Code Test - Guillaume Vial-Pailler

## Ticket: Run an auto-updating twitter-like feed.

**_As a_** Twitter user<br/>
**_I want to_** read real-time tweets in my feed<br/>
**_So that_** I can stay up the date with the latest news

### Description

This ticket aims at creating an auto-updating twitter-like feed for the Front-End position at Bumble.

The following instructions and technical requirements were provided by Tom Londa, Technical Recruiter:

#### Instructions

1. The app should show the latest tweets after the first request
2. The list of tweets should update automatically every two seconds
3. The older tweets must be pushed down in the page
4. The newer tweets should come at the top
5. There should be no duplicate tweets on the page
6. There should be no skipped or missed tweets on the page
7. In case of any failure conditions the tweet updates can pause or stop, but no error messages should be shown to the user.

Designs should be based on the following wireframe:

<img src="./codeReviewAssets/wireframe.png"
alt="Tweet Wireframe"
style="width: 500px;" />

#### Technical Requirements

1. Host your code on CodeSandbox as this will allow us to easily review and run your solution
2. You don’t need to focus on the UI too much, a barebones version will do just fine
3. You can choose any technology stack you are comfortable with
4. Please don’t make any additional efforts on writing tests etc
5. We will be reviewing your code on the following criteria:
   - Architecture decisions made
   - Readability of your code
   - Handling of edge cases, performance issues and stability of the web app

### Acceptance Criteria

**GIVEN** a user accessing the Twitter feed page<br />
**WHEN** the page is loading<br />
**THEN** the latest tweets are being requested for the first time ✅

**GIVEN** the latest tweets are being requested for the first time<br />
**WHEN** the request is processing<br />
**THEN** the user is aware the tweets are loading ✅

**GIVEN** the latest tweets have been requested for the first time<br />
**AND** some new tweets have been fetched<br />
**WHEN** the request is successful<br />
**THEN** a loading component is removed ✅

**GIVEN** the latest tweets have been requested for the first time<br />
**AND** some new tweets have been fetched<br />
**WHEN** the request is successful<br />
**THEN** all tweets received should be displayed in descending order based on published time ✅

**GIVEN** a tweet is requested<br />
**WHEN** the tweet is rendered<br />
**THEN** the tweet should include a given user's avatar, username and tweet content (see design) ✅

**GIVEN** the twitter feed has been loaded for the first time<br />
**WHEN** the previous tweets have been rendered 2 seconds ago<br />
**THEN** the newest tweets are fetched ✅

**GIVEN** the newest tweets are fetched<br />
**WHEN** the newest tweets are successfully requested<br />
**THEN** the newest tweets should be rendered above the oldest tweets in the feed ✅

**GIVEN** the latest tweets have been requested for the first time<br />
**AND** some new tweets have been fetched<br />
**WHEN** the request is unsuccessful<br />
**THEN** no error messages should be displayed ✅
