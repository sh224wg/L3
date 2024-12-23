# Test Rapport
The app was tested with both automatic and manual tests. Automatic tests written in Jest were written for both the scraper module and the console line app. In order to test the module mock HTTP-requests were created through node-fetch. While a mock fs was used to test the console line app in order to test file system operations. Please see the test folder for more information. 
Additionally manual tests were written for the Control Line app to test formatting, output saving, and url validation. For more information regarding this please see the bottom of the rapport.

## Automatic test

### Scraper 
See scraper.test.js file

| Test   | Description                      |status |
|--------|----------------------------------|-------|
| Test 1 | ValiduteUrl should return true   | Pass  |
|        | for valid URL                    |       |
|--------|----------------------------------|-------|
| Test 2 | ValidateUrl should return false  | Pass  |
|        | for invalid urls.                |       |
|--------|----------------------------------|-------|
| Test 3 | selectRandomUserAgent should     | Pass  |
|        | return a non empty string        |       |
|--------|----------------------------------|-------|
| Test 4 | BuildHeaderOptions should include|Pass   |
|        | a user-agent header              |       |
|--------|----------------------------------|-------|
| Test 5 | extractDataFromDom should extract| Pass  |
|        | text content from DOM document   |       |
|--------|----------------------------------|-------|
| Test 6 | scrapeWebPage should return      | Pass  |
|        | scraped content                  |       |
|--------|----------------------------------|-------|
| Test 7 | scrapeAndFindNextPage should     | Pass  |
|        | return next page URL when link to|       |
|        | next page is present             |       |


### ConsoleLineApp
See console.test.js

| Test   | Description                      | status|
|--------|----------------------------------|-------|
| Test 1 |Should save scraped result to file| Pass  |
|--------|----------------------------------|-------|
| Test 2 |Should validate input URL and exit|       |
|        |if no URL is present              | Pass  |
|--------|----------------------------------|-------|
| Test 3 | Should exit with error if run    | Pass  |
|        | method fails                     |       |
|--------|----------------------------------|-------|

## Manual Test Cases
For ConsoleLineApp

| Test   | Description                      | status|
|--------|----------------------------------|-------|
| Test 1 | URL Validation in CLI            | Pass  |
|--------|----------------------------------|-------|
| Test 2 | URL validation with invalid URL  | Pass  |
|--------|----------------------------------|-------|
| Test 3 | scraped content formatted        | Pass  |
|        | correctly                        |       |
|--------|----------------------------------|-------|
| Test 4 | CLI runs scraper and saves ouput | Pass  |

### Test Case 1: Validate Input URL
Description: Ensure that the CLI validates the input URL correctly.
Steps:
1. Run the CLI without providing a URL.
2. Observe the output.
Expected Result: The CLI should display an error message: "Please enter a URL to scrape."
Result:
![Test](./img/test1.png)

### Test Case 2: Validate URL Format
Description: Ensure that the CLI validates the format of the input URL.
Steps:
1. Run the CLI with an invalid URL format (e.g., invalid-url).
1. Observe the output.
Expected Result: The CLI should display an error message: "Invalid URL."
Result:
![Test](./img/test2.png)

### Test Case 3: Format Result
Description: Ensure that the CLI formats the scraped result correctly.
Steps:
1. Create an mock output from scraped content. (see manualTest.js)
2. Call the formatResult method with the sample result. (node manualTest.js)
3. Observe the formatted output.
Expected Result: The formatted output should contain the keys in uppercase and the values properly formatted.
Result:
![Test](/img/test3.png)

### Test Case 4: Run Scraper and Save Result
Description: Ensure that the CLI runs the scraper and saves the result.
Steps:
1. Run the CLI with a valid URL: https://example.edu/
2. Observe the output and file operations.
Expected Result: The CLI should scrape the web page, format the result, and save it to a file.
Result:
![Test](./img/test4.png)
![Test](./img/test5.png)