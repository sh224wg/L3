# Test Rapport





## Manual Test Cases

### Test Case 1: Validate Input URL
Description: Ensure that the CLI validates the input URL correctly.
Steps:
Run the CLI without providing a URL.
Observe the output.
Expected Result: The CLI should display an error message: "Please enter a URL to scrape."
![Test](./img/test1.png)

### Test Case 2: Validate URL Format
Description: Ensure that the CLI validates the format of the input URL.
Steps:
Run the CLI with an invalid URL format (e.g., invalid-url).
Observe the output.
Expected Result: The CLI should display an error message: "Invalid URL."
![Test](./img/test2.png)

### Test Case 3: Format Result
Description: Ensure that the CLI formats the scraped result correctly.
Steps:
Create an mock output from scraped content. (see manualTest.js)
Call the formatResult method with the sample result.
Observe the formatted output.
Expected Result: The formatted output should contain the keys in uppercase and the values properly formatted.
![Test](/img/test3.png)

### Test Case 5: Run Scraper and Save Result
Description: Ensure that the CLI runs the scraper and saves the result.
Steps:
Run the CLI with a valid URL: https://example.edu/
Observe the output and file operations.
Expected Result: The CLI should scrape the web page, format the result, and save it to a file.
![Test](./img/test4.png)
![Test](./img/test5.png)