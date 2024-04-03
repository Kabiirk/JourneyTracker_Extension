# JourneyTracker_Extension
JourneyTracker streamlines the research process by creating a seamless environment for users to curate, organize, and revisit information from diverse sources effortlessly. Furthermore, the system aims to leverage AI to offer automated summarizations of collected data, saving users valuable time and effort in information processing.

## How to Run This Project:
1. Clone the repository
    ```
    git clone https://github.com/Kabiirk/JourneyTracker_Extension.git
    ```

2. Go into the root Directory `JourneyTracker_Extension/`, & install dependencies by running:
    ```
   yarn install
    ```
    
3. Then, type the following in your CLI :
    ```
   yarn run watch
    ```
    
4. This will create a `dist/` directory in the root repo. It will also start an active build session where any change you make to the Extension is reflected.
    > **Note:** To stop the session, you can simply press `CTRL + C`. But to make changes to the application, you would need to re-run `yarn run watch` & start a build session.

5. Then, on chrome, go to `chrome://extensions` > click `Load unpacked button` > select the `dist/` folder in the file explorer pop-up > Click `Select Folder`. Then you should be able to see the Extension Tile on your page.

6. Activate it by pressing the bottom-right toggle button & you should be able to go to a website, select text, right click & 'Record' it by selecting a text, right clicking & Selecting `Record Text` from the context menu.

## How to Test this Project:
The testing in this project has been implemented through 2 main frameworks:
1. [Jest](https://jestjs.io/) (Unit Testing)
2. [Puppeteer](https://pptr.dev/) (End-to-End Testing)

The main configuration of the test environment has been done in `./jest.config.js` & `./src/setupTests.ts`.

Test Cases are been written in `./src/__test__/` folder. New test cases are to be defined in this folder.

To run pre-existing test cases while you are in the root of the project, simply type:
```
yarn run test
```

This would generate both test report, telling which test cases pass and which test cases fail, A& a coverage report for the code.

> **Note:** There are 2 enviroments the test cases run in, The unit tests (written purely with Jest), run in `js-dom`. While the Puppeteer test cases run in Puppeteer's own environment. To ensure the 2 environments don't overlap and try to ovverride each other, the below line needs to be added to Unit tests which only use jest:\
    `/**`\
    `* @jest-environment jsdom`\
    `*/`\
This Ensures that tests are run with their corresponding enviroment. An example of this can be found in the following unit tests:\
`test/ActionButtons.test.tsx`\
`test/ClipboardTable.test.tsx`\
`test/HomeHeader.test.tsx`\
`test/journeyList.test.tsx `