# JourneyTracker_Extension
JourneyTracker streamlines the research process by creating a seamless environment for users to curate, organize, and revisit information from diverse sources effortlessly. Furthermore, the system aims to leverage AI to offer automated summarizations of collected data, saving users valuable time and effort in information processing.

## How to Run This Project:
1. Install dependencies by running:
    ```
   yarn install
    ```
    
2. Then, type the following in your CLI :
    ```
   yarn run watch
    ```
    
3. This will create a `dist/` directory in the root repo. It will also start an active build session where any change you make to the Extension is reflected.
    > **Note:** To stop the session, you can simply press `CTRL + C`. But to make changes to the application, you would need to re-run `yarn run watch` & start a build session.

4. Then, on chrome, go to `chrome://extensions` > click `Load unpacked button` > select the `dist/` folder in the file explorer pop-up > Click `Select Folder`. Then you should be able to see the Extension Tile on your page.

5. Activate it by pressing the bottom-right toggle button & you should be able to go to a website, select text, right click & 'Record' it by selecting a text, right clicking & Selecting `Record Text` from the context menu.